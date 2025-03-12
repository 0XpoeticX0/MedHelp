import express from "express";
import {
  createUserController,
  getUsersController,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", createUserController);
router.get("/", getUsersController);

export default router;
