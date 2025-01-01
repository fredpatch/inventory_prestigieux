import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const generate_access_token = (user) => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return jwt.sign({ id: user.id, role: user.role }, jwtSecret, {
    expiresIn: "1h",
  });
};
