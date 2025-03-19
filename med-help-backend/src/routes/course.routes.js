import express from "express";
import auth from "../middlewares/auth.js";
import {
  createCourseController,
  deleteCourseController,
  getCourseController,
  updateCourseController,
} from "../controllers/course.controller.js";

const router = express.Router();

router.post("/", auth("admin"), createCourseController);
router.get("/", auth("admin"), getCourseController);
router.put("/:id", auth("admin"), updateCourseController);
router.delete("/:id", auth("admin"), deleteCourseController);

export default router;
