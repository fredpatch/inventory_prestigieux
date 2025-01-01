import axios from "axios";
import dotenv from "dotenv";
import { createAccessToken } from "../utils/auth0.js";
dotenv.config();

const AUTH0_DOMAIN = process.env.AUTH0_ISSUER_BASE_URL;

export const delete_user = async (req, res) => {
  try {
    console.log("User ID to be deleted:", req.params);
    const { user_id } = req.params;
    const token = await createAccessToken();
    if (!token) {
      throw new Error("Failed to get token");
    }

    const response = await axios.delete(
      `${AUTH0_DOMAIN}/api/v2/users/${user_id}`,
      {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 204) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to delete user" });
    }

    return res.status(200).json({ success: true, message: "User deleted" });
  } catch (error) {
    console.error(
      "Failed to delete user:",
      error.response?.data || error.message
    );

    return res
      .status(500)
      .json({ success: false, message: "Failed to delete user" });
  }
};
