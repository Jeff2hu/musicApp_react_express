import express from "express";
import { getStatsController } from "../controller/stats.controller.js";
import {
  adminMiddleware,
  protectMiddleware,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectMiddleware, adminMiddleware, getStatsController);

export default router;
