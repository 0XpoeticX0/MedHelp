import express from "express";
import {
  getDashboardStats,
  loginUserController,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", loginUserController);
router.get("/dashboard-stats", getDashboardStats);

export default router;
