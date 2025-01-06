import express from "express";
import { getAllUsersController } from "../controller/user.controller.js";
import { protectMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectMiddleware, getAllUsersController);

export default router;
