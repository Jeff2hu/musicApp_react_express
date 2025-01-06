import express from "express";
import {
  getAllSongsController,
  getFeaturedSongController,
  getMadeForYouSongController,
  getTrendingSongController,
} from "../controller/song.controller.js";
import {
  adminMiddleware,
  protectMiddleware,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectMiddleware, adminMiddleware, getAllSongsController);
router.get("/featured", getFeaturedSongController);
router.get("/madeForYou", getMadeForYouSongController);
router.get("/trending", getTrendingSongController);

export default router;
