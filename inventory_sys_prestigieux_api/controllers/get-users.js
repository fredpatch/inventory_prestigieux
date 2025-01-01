import { createAccessToken } from "../utils/auth0.js";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const get_users = async (req, res) => {
  try {
    const response = await createAccessToken();
    if (!response) {
      throw new Error("Failed to get token");
    }

    const users = await axios.get(
      `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users`,
      { headers: { Authorization: `Bearer ${response.access_token}` } }
    );

    if (!users) {
      throw new Error("Failed to get users");
    }

    res.status(200).json(users.data);
  } catch (error) {
    console.log(error);
  }
};
