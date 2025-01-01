import express from "express";
import {
  delete_user,
  get_users,
  login_user,
  logout_user,
  register_user,
  update_user,
} from "../controllers/custom-auth-controller.js";
import { verifyJWT } from "./../middlewares/verifyJWT.js";

const users = express.Router();

// basic action
users.post("/add-user", register_user);
users.post("/login", login_user);
users.post("/logout", logout_user);

// advanced action
users.get("/get-users", verifyJWT, get_users);
users.patch("/update-user/:user_id", verifyJWT, update_user);
users.delete("/delete-user/:user_id", verifyJWT, delete_user);

export default users;
