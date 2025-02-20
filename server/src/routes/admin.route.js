import express from "express";
import {
  checkAdminController,
  createAlbumController,
  createSongController,
  deleteAlbumController,
  deleteSongController,
  updateSongController,
} from "../controller/admin.controller.js";

const router = express.Router();

// router.use(protectMiddleware, adminMiddleware);

router.get("/check", checkAdminController);

router.post("/song", createSongController);
router.put("/song/:id", updateSongController);
router.delete("/song/:id", deleteSongController);

router.post("/album", createAlbumController);
router.delete("/album/:id", deleteAlbumController);

export default router;
