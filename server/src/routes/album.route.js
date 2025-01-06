import express from "express";
import {
  getAlbumByIdController,
  getAllAlbumController,
} from "../controller/album.controller.js";

const router = express.Router();

router.get("/", getAllAlbumController);
router.get("/:id", getAlbumByIdController);

export default router;
