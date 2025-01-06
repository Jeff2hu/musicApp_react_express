import express from "express";
import {
  checkAdminController,
  createAlbumController,
  createSongController,
  deleteAlbumController,
  deleteSongController,
} from "../controller/admin.controller.js";
import {
  adminMiddleware,
  protectMiddleware,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protectMiddleware, adminMiddleware);

router.get("/check", checkAdminController);

router.post("/song", createSongController);
router.delete("/song/:id", deleteSongController);

router.post("/album", createAlbumController);
router.delete("/album/:id", deleteAlbumController);

export default router;
