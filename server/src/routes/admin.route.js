import express from "express";
import {
  checkAdminController,
  createAlbumController,
  createSongController,
  deleteAlbumController,
  deleteSongController,
  updateAlbumController,
  updateSongController,
} from "../controller/admin.controller.js";

const router = express.Router();

//adminMiddleware
// router.use(protectMiddleware);

router.get("/check", checkAdminController);

router.post("/song", createSongController);
router.put("/song/:id", updateSongController);
router.delete("/song/:id", deleteSongController);

router.post("/album", createAlbumController);
router.put("/album/:id", updateAlbumController);
router.delete("/album/:id", deleteAlbumController);

export default router;
