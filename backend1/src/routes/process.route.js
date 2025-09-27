import express from "express";
import {
  processRequest,
  getUserHistory,
  getDetectionDetails,
  getUserStats,
  uploadMiddleware,
} from "../controller/process.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Main disease detection endpoint
router.post("/", protectRoute, uploadMiddleware, processRequest);

// Get user's detection history with pagination
router.get("/history/:userId", protectRoute, getUserHistory);

// Get specific detection details
router.get("/detection/:detectionId", protectRoute, getDetectionDetails);

// Get user statistics
router.get("/stats/:userId", protectRoute, getUserStats);

// Health check for the processing service
router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    service: "Disease Detection API",
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

export default router;
