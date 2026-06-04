import express from "express";
import { getAdminStats } from "../controllers/admin.controller";
import { adminOnly, protect } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/stats", protect, adminOnly, getAdminStats);

export default router;