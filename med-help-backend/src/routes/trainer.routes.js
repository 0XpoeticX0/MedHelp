import express from "express";
import auth from "../middlewares/auth.js";
import {
  createTrainerController,
  deleteTrainerController,
  editTrainerController,
  getTrainerController,
} from "../controllers/trainer.controller.js";

const router = express.Router();

router.post("/", auth("admin"), createTrainerController);
router.get("/", auth("admin"), getTrainerController);
router.put("/:id", auth("admin"), editTrainerController);
router.delete("/:id", auth("admin"), deleteTrainerController);

export default router;
