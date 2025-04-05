import express from "express";
import auth from "../middlewares/auth.js";

import {
  createUserController,
  deleteUsersController,
  getHelpForVolunteerController,
  getUsersController,
  getVolunteerAvailabilityController,
  seekHelpController,
  toggleUserStatusController,
  volunteerAvailabilityController,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", createUserController);
router.get("/", getUsersController);
router.patch("/toggleStatus/:id", auth("admin"), toggleUserStatusController);
router.delete("/delete/:id", auth("admin"), deleteUsersController);
router.post(
  "/availability",
  auth("volunteer"),
  volunteerAvailabilityController
);
router.get(
  "/availability",
  auth("volunteer"),
  getVolunteerAvailabilityController
);
router.post("/seek-for-help", seekHelpController);
router.get(
  "/help-for-volunteer",
  auth("volunteer"),
  getHelpForVolunteerController
);

export default router;
