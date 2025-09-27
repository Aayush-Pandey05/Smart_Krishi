import express from "express";
import {
  getIrrigationAdvice,
  getUserIrrigationHistory,
  getIrrigationDetails,
  getUserIrrigationStats,
} from "../controller/irrigation.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Generate irrigation advice
router.post("/", protectRoute, getIrrigationAdvice);

// Get user's irrigation history with pagination
router.get("/history", protectRoute, getUserIrrigationHistory);

// Get specific irrigation advice details
router.get("/details/:irrigationId", protectRoute, getIrrigationDetails);

// Get user's irrigation statistics
router.get("/stats", protectRoute, getUserIrrigationStats);

// Health check for the irrigation service
router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    service: "Irrigation Advice API",
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

export default router;
