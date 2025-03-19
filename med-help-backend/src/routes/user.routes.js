import express from "express";
import auth from "../middlewares/auth.js";

import {
  createUserController,
  deleteUsersController,
  getUsersController,
  toggleUserStatusController,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", createUserController);
router.get("/", getUsersController);
router.patch("/toggleStatus/:id", auth("admin"), toggleUserStatusController);
router.delete("/delete/:id", auth("admin"), deleteUsersController);

export default router;
