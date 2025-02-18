import express from "express";
import {
  getAllSongsController,
  getFeaturedSongController,
  getMadeForYouSongController,
  getTrendingSongController,
} from "../controller/song.controller.js";

const router = express.Router();

// , protectMiddleware, adminMiddleware
router.get("/", getAllSongsController);
router.get("/featured", getFeaturedSongController);
router.get("/madeForYou", getMadeForYouSongController);
router.get("/trending", getTrendingSongController);

export default router;
