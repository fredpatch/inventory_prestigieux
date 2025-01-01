import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyJWT = async (req, res, next) => {
  let token;
  // const token = req.cookies.token;
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader && authHeader.split(" ")[1];
  }
  const jwtSecret = process.env.JWT_SECRET;
  // console.log(`token: ${token}`);

  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  try {
    const decode = jwt.verify(token, jwtSecret);

    req.user = decode;
    req.role = decode.role;
    req.id = decode.id;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

/* 

The verifyJWT function is an Express middleware designed to verify JSON Web Tokens (JWT) in incoming HTTP requests. It begins by attempting to extract the token from the Authorization header of the request. The header is expected to follow the format "Bearer <token>". If the header is present and correctly formatted, the token is extracted by splitting the header string and taking the second part.

Next, the function checks if a token was successfully extracted. If no token is found, it responds with a 401 status code and a message indicating that no token was provided. This ensures that requests without a valid token are not processed further.

If a token is present, the function proceeds to verify it using the secret key stored in the environment variable JWT_SECRET. The jwt.verify method is used for this purpose. If the token is valid, the decoded payload is attached to the req object, making the user information, role, and ID available for subsequent middleware or route handlers. The next function is then called to pass control to the next middleware.

In case of an error during token verification, such as an invalid or expired token, the function catches the error and responds with a 401 status code and a message indicating that the token is invalid. This ensures that only requests with valid tokens are allowed to proceed, providing a layer of security for the application.

*/
