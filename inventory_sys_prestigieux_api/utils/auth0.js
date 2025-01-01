import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const config = {
  client_id: process.env.AUTH0_CLIENT_ID,
  client_secret: process.env.AUTH0_CLIENT_SECRET,
  audience: process.env.AUTH0_AUDIENCE,
  grant_type: "client_credentials",
};

export const createAccessToken = async () => {
  try {
    const response = await axios.post(
      `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
      config,
      {
        headers: {
          authorization: `Bearer ${process.env.AUTH0_MANAGEMENT_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(`Failed to get access token: ${error}`);
  }
};
