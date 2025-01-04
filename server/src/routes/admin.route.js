import express from "express";
import {
  createSongController,
  deleteSongController,
} from "../controller/admin.controller.js";
import {
  adminMiddleware,
  protectMiddleware,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/song", protectMiddleware, adminMiddleware, createSongController);
router.delete(
  "/song/:id",
  protectMiddleware,
  adminMiddleware,
  deleteSongController
);

export default router;
