import axios from "axios";
import dotenv from "dotenv";
import { createAccessToken } from "../utils/auth0.js";
dotenv.config();

export const getUsers_Roles = async (req, res) => {
  try {
    const token = await createAccessToken();
    if (!token) {
      throw new Error("Failed to get token");
    }

    const usersResponse = await axios.get(
      `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users`,
      { headers: { Authorization: `Bearer ${token.access_token}` } }
    );

    if (!usersResponse) {
      throw new Error("Failed to get users");
    }
    const users = usersResponse.data;

    const usersWithRoles = await Promise.all(
      users.map(async (user) => {
        const rolesResponse = await axios.get(
          `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${user.user_id}/roles`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token.access_token}`,
            },
          }
        );

        if (!rolesResponse) {
          throw new Error(`Failed to fetch roles for user ${user.user_id}`);
        }

        const roles = rolesResponse.data;

        return { ...user, roles };
      })
    );

    res.status(200).json(usersWithRoles);
  } catch (error) {
    console.log(error);
  }
};
