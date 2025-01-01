import axios from "axios";
import dotenv from "dotenv";
import { createAccessToken } from "../utils/auth0.js";
dotenv.config();

const AUTH0_DOMAIN = process.env.AUTH0_ISSUER_BASE_URL;

export const update_user = async (req, res) => {
  try {
    const { user_id, name, email, user_metadata } = req.body;
    const token = await createAccessToken();
    if (!token) {
      throw new Error("Failed to get token");
    }

    const payload = {
      name: name,
      email: email,
      user_metadata: user_metadata,
    };

    const response = await axios.patch(
      `${AUTH0_DOMAIN}/api/v2/users/${user_id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.status(200).json({ success: true, user: response.data });
  } catch (error) {
    console.error("Failed to add user:", error.response?.data || error.message);
    return res
      .status(500)
      .json({ message: "Failed to add user", success: false });
  }
};
