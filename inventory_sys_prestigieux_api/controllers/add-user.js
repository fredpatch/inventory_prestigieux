import dotenv from "dotenv";
import axios from "axios";
import { createAccessToken } from "../utils/auth0.js";
import {
  profile_imgs_collections_list,
  profile_imgs_name_list,
} from "../utils/default-img.js";
dotenv.config();

const AUTH0_DOMAIN = process.env.AUTH0_ISSUER_BASE_URL;

export const addUserToAuth0 = async (req, res) => {
  try {
    const token = await createAccessToken();
    if (!token) {
      throw new Error("Failed to get token");
    }

    const {
      app_metadata,
      blocked,
      connection,
      email,
      email_verified,
      family_name,
      given_name,
      name,
      nickname,
      password,
      picture,
      user_metadata,
      username,
      verify_email,
    } = req.body;

    let payload = {
      email: email,
      user_metadata: user_metadata,
      blocked: blocked,
      app_metadata: app_metadata,
      given_name: given_name || undefined,
      family_name: family_name || undefined,
      name: name || undefined,
      nickname: nickname || undefined,
      email_verified: email_verified || false,
      picture:
        picture ||
        `https://api.dicebear.com/6.x/${
          profile_imgs_collections_list[
            Math.floor(Math.random() * profile_imgs_collections_list.length)
          ]
        }/svg?seed=${
          profile_imgs_name_list[
            Math.floor(Math.random() * profile_imgs_name_list.length)
          ]
        }`,
      connection: connection || "Username-Password-Authentication",
      password: password,
      username: username || undefined,
      verify_email: verify_email || false,
    };

    // console.log("Payload to be sent:", payload);

    const response = await axios.post(`${AUTH0_DOMAIN}/api/v2/users`, payload, {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
        "Content-Type": "application/json",
      },
    });

    const createdUser = response.data;

    res.status(200).json(createdUser);
  } catch (error) {
    // console.error("Failed to add user:", error);
    res
      .status(500)
      .json({ message: "Failed to add user", error: error.response.data });
  }
};
