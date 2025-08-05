import express from "express";
import auth from "../middlewares/auth.js";
import {
  completeHelpController,
  getHelpByIdController,
  getHelpForVolunteerController,
  getPatientHelpHistoryController,
  getRunningServicesController,
  getServiceHistoryController,
  seekHelpController,
  updateHelpStatusController,
} from "../controllers/help.controller.js";

const router = express.Router();

router.post("/post-for-help", seekHelpController);
router.get(
  "/get-running-services",
  auth("volunteer"),
  getRunningServicesController
);
router.get(
  "/help-for-volunteer",
  auth("volunteer"),
  getHelpForVolunteerController
);
router.put(
  "/update-help-status",
  auth("volunteer"),
  updateHelpStatusController
);
router.put("/complete-help", auth("volunteer"), completeHelpController);
router.get("/:helpId", auth("volunteer"), getHelpByIdController);
router.get("/services/history", auth("volunteer"), getServiceHistoryController);
router.get(
  "/patient/history",
  auth("patient"),
  getPatientHelpHistoryController
);

export default router;
