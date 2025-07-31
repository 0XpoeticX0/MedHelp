import express from "express";
import {
  getDashboardStats,
  loginUserController,
  sendMailController,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", loginUserController);
router.get("/dashboard-stats", getDashboardStats);
router.post("/send-email", sendMailController);

export default router;
