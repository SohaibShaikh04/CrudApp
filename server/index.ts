import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { handleDemo } from "./routes/demo";
import { handleSignup, handleLogin } from "./routes/auth";
import { handleGetProfile, handleUpdateProfile } from "./routes/users";
import { handleGetTasks, handleCreateTask, handleUpdateTask, handleDeleteTask } from "./routes/tasks";
import { authMiddleware } from "./middleware/auth";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Connect to MongoDB
  const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/scalable-app";
  mongoose.connect(mongoUri)
    .then(() => {
      console.log("✅ Connected to MongoDB");
    })
    .catch((err) => {
      console.error("❌ MongoDB connection error:", err);
      // Continue anyway for development - in production you'd want to exit
    });

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Auth routes
  app.post("/api/auth/signup", handleSignup);
  app.post("/api/auth/login", handleLogin);

  // Protected user routes
  app.get("/api/users/profile", authMiddleware, handleGetProfile);
  app.patch("/api/users/profile", authMiddleware, handleUpdateProfile);

  // Protected task routes
  app.get("/api/tasks", authMiddleware, handleGetTasks);
  app.post("/api/tasks", authMiddleware, handleCreateTask);
  app.patch("/api/tasks/:id", authMiddleware, handleUpdateTask);
  app.delete("/api/tasks/:id", authMiddleware, handleDeleteTask);

  return app;
}
