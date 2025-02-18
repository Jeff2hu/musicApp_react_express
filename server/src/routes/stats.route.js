import express from "express";
import { getStatsController } from "../controller/stats.controller.js";

const router = express.Router();

// , protectMiddleware, adminMiddleware
router.get("/", getStatsController);

export default router;
