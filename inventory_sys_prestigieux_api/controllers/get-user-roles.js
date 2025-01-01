import axios from "axios";
import dotenv from "dotenv";
import { createAccessToken } from "../utils/auth0.js";
dotenv.config();

export const get_user_roles = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { access_token } = await createAccessToken();
    if (!access_token) {
      throw new Error("Failed to get token");
    }

    const response = await axios.get(
      `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${user_id}/roles`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (!response) {
      throw new Error("Failed to get roles");
    }

    const roles = response.data.map((role) => role.name);

    let isAdmin = false;

    if (roles.includes("Admin")) {
      console.log("User is an admin");
      isAdmin = true;
    }

    res.status(200).json({
      isAdmin: isAdmin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.data?.message || error.message });
  }
};
