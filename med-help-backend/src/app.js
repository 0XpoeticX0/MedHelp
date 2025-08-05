import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import trainerRoutes from "./routes/trainer.routes.js";
import courseRoutes from "./routes/course.routes.js";
import helpRoutes from "./routes/help.routes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors("https://med-help-weld.vercel.app"));
app.use(express.json());

// Routes
app.get("/", (req, res) => res.status(200).send("welcome to med help server!"));
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/trainers", trainerRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/help", helpRoutes);

export default app;
