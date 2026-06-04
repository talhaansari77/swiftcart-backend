import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/product.controller";
import { adminOnly, protect } from "../middleware/auth.middleware";

const router = express.Router();

router.route("/").get(getProducts).post(protect, adminOnly, createProduct);

router
  .route("/:id")
  .get(getProductById)
  .put(protect, adminOnly, updateProduct)
  .delete(protect, adminOnly, deleteProduct);

export default router;