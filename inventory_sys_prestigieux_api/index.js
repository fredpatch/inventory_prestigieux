import express from "express";
import dotenv from "dotenv";
import aj from "./utils/arcjet.js";

import cors from "cors";
import morgan from "morgan";
import product from "./routes/product-routes.js";
import users from "./routes/user-routes.js";
import cookieParser from "cookie-parser";
import { verifyJWT } from "./middlewares/verifyJWT.js";
dotenv.config();

const server = express();
const PORT = process.env.PORT || 5000;

// Middlewares
server.use(cookieParser());
server.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
// server.use(async (req, res, next) => {
//   const decision = await aj.protect(req, { requested: 5 });

//   if (decision.isDenied()) {
//     if (decision.reason.isRateLimit()) {
//       // res.writeHead(429, { "Content-Type": "application/json" });
//       // res.end(JSON.stringify({ error: "Too Many Requests" }));
//       return res.status(429).json({ message: "Rate Limit Exceeded" });
//     } else if (decision.reason.isBot()) {
//       res.status(403).json({ message: "No bots allowed" });
//     } else {
//       res.status(403).json({ message: "Forbidden" });
//     }

//     return res.status(403).json({ message: "Access Denied" });
//   } else if (decision.reason.isBot() && decision.reason.isSpoofed()) {
//     // Arcjet Pro plan verifies the authenticity of common bots using IP data.
//     // Verification isn't always possible, so we recommend checking the decision
//     // separately.
//     // https://docs.arcjet.com/bot-protection/reference#bot-verification

//     res.status(403).json({ message: "Forbidden" });
//   }

//   next();
// });

server.get("/protected-route", verifyJWT, (req, res) => {
  res
    .status(200)
    .json({ message: "You have access to this route", user: req.user });
});

// Routes
server.use("/api/v1/products", product);
server.use("/api/v1/users", users);

// catch 404 and forward to error handler
server.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handler
server.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: process.env.NODE_ENV !== "production" ? err : {},
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
