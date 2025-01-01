import express from "express";
import {
  addProduct,
  get_product,
  update_product,
} from "../controllers/product-operations.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const product = express.Router();

product.post("/add-product", verifyJWT, addProduct);
product.get("/get-products", get_product);
product.patch("/update-product/:id", verifyJWT, update_product);
// product.delete("/delete-product/:id", verifyJWT, delete_product);

export default product;
