import express from "express";
import {
  createOrder,
  getAllOrders,
  getMyOrders,
  getOrderById,
  markOrderAsPaid,
  updateOrderStatus,
} from "../controllers/order.controller";
import { adminOnly, protect } from "../middleware/auth.middleware";

const router = express.Router();

router.route("/").post(protect, createOrder).get(protect, adminOnly, getAllOrders);

router.get("/my-orders", protect, getMyOrders);

router
  .route("/:id")
  .get(protect, getOrderById);

router.put("/:id/status", protect, adminOnly, updateOrderStatus);
router.put("/:id/pay", protect, adminOnly, markOrderAsPaid);

export default router;