import {
  email_validation,
  password_validation,
} from "../utils/data-validation.js";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { generate_username } from "../utils/generate-username.js";
import {
  profile_imgs_collections_list,
  profile_imgs_name_list,
} from "../utils/default-img.js";
import { formatDataToSend } from "../utils/formatDataToSend.js";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const register_user = async (req, res) => {
  const { email, password, fullname, profile_img, role } = req.body;

  try {
    if (!email || !password || !fullname) {
      console.log("All fields are required");
      return res.status(422).json({ message: "All fields are required" });
    }

    // Input validation
    if (fullname.length <= 3) {
      return res
        .status(400)
        .json({ message: "Fullname must be at least 3 characters long" });
    }
    if (email.length === 0) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!email_validation.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (!password_validation.test(password)) {
      return res.status(400).json({
        message:
          "Password should be between 6 to 20 characters and should contain at least 1 uppercase letter, 1 lowercase letter and 1 digit",
      });
    }
    console.log(`User Input Validated Successfully`);

    // check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: { personal_info: { email: email } },
    });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    console.log(`User doesn't exist. Creating user...`);

    // Hashing user password
    const hashed_password = await new Promise((resolve, reject) => {
      bcrypt.hash(password, 12, (err, hash) => {
        if (err) {
          return reject(err); // if hashing fails, reject the promise
        }
        resolve(hash); // if hashing succeeds, resolve the promise with the hashed password
      });
    });
    console.log(`Password Hashed Successfully`);

    const username = await generate_username(email);
    console.log(`Username Generated Successfully`);

    let user = await prisma.user.create({
      data: {
        personal_info: {
          create: {
            username: username,
            email: email,
            password: hashed_password,
            fullname: fullname,
            profile_img:
              profile_img ||
              `https://api.dicebear.com/6.x/${
                profile_imgs_collections_list[
                  Math.floor(
                    Math.random() * profile_imgs_collections_list.length
                  )
                ]
              }/svg?seed=${
                profile_imgs_name_list[
                  Math.floor(Math.random() * profile_imgs_name_list.length)
                ]
              }`,
          },
        },
        role: role ?? "agent",
      },
      include: {
        personal_info: true,
      },
    });
    console.log(`User Created Successfully`);

    res.status(201).json(formatDataToSend(user));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const login_user = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      console.log("All fields are required");
      return res.status(422).json({ message: "All fields are required" });
    }

    // Input validation
    if (!email_validation.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (!password_validation.test(password)) {
      return res.status(400).json({
        message:
          "Password should be between 6 to 20 characters and should contain at least 1 uppercase letter, 1 lowercase letter and 1 digit",
      });
    }
    console.log(`User Input Validated Successfully`);

    // check if user already exists
    const user = await prisma.user.findFirst({
      where: { personal_info: { email: email } },
      include: {
        personal_info: true,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(`User Found Successfully`);

    if (user.blocked) {
      return res.status(403).json({ message: "User is blocked" });
    }

    if (!user.personal_info.password) {
      return res.status(403).json({ message: "User password is not set" });
    }

    if (!user.google_auth) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        user.personal_info.password
      );
      if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      console.log(`Password Matched Successfully`);

      res.status(201).json(formatDataToSend(user));
    } else {
      return res.status(403).json({
        message:
          "User can't logged in with email and password. Please try login with google account.",
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const logout_user = async (req, res) => {
  try {
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const get_users = async (req, res) => {
  const user = req.user;
  try {
    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Unauthorized. Only Admins can access this route" });
    }
    const users = await prisma.user.findMany({
      select: {
        personal_info: {
          select: {
            username: true,
            email: true,
            fullname: true,
            profile_img: true,
          },
        },
        role: true,
        blocked: true,
        google_auth: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.status(200).json(users, {
      success: true,
      message: "Users fetched successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
      success: false,
    });
  }
};

export const update_user = async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Unauthorized. Only Admins can access this route" });
    }
    const { user_id } = req.params;
    const { role, blocked } = req.body;
    const updatedUser = await prisma.user.update({
      where: { id: user_id },
      data: {
        role: role,
        blocked: blocked,
      },
    });
    res.status(200).json(updatedUser, {
      success: true,
      message: "User updated",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const delete_user = async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Unauthorized. Only Admins can access this route" });
    }
    const { user_id } = req.params;
    const deletedUser = await prisma.user.delete({
      where: { id: user_id },
    });
    res
      .status(200)
      .json(deletedUser, { success: true, message: "User deleted" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

/* 
These functions include registering a new user, logging in a user, logging out a user, fetching users, updating a user, and deleting a user.

The register_user function handles user registration. It first validates the input fields to ensure that email, password, and fullname are provided and meet certain criteria. If the input is valid, it checks if a user with the provided email already exists. If not, it hashes the password, generates a username, and creates a new user in the database. The newly created user is then returned in the response.

The login_user function handles user login. It validates the input fields and checks if a user with the provided email exists. If the user is found and is not blocked, it verifies the password. If the password is correct, the user is returned in the response. If the user is set up for Google authentication, it prompts the user to log in with their Google account.

The logout_user function simply returns a success message indicating that the user has logged out.

The get_users function fetches all users from the database. It checks if the requesting user has an admin role before proceeding. If the user is an admin, it retrieves and returns a list of users with their personal information.

The update_user function updates a user's role and blocked status. It checks if the requesting user is an admin before proceeding. If the user is an admin, it updates the specified user's role and blocked status in the database and returns the updated user.

The delete_user function deletes a user from the database. It checks if the requesting user is an admin before proceeding. If the user is an admin, it deletes the specified user from the database and returns the deleted user in the response.

Overall, these functions provide a comprehensive set of operations for managing user authentication and user data in the application.
*/
