import express from "express";
import { loginUserController } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", loginUserController);

export default router;
