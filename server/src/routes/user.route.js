import express from "express";
import {
  getAllUsersController,
  getMessageByUserIdController,
} from "../controller/user.controller.js";

const router = express.Router();

// router.use(protectMiddleware);

router.get("/", getAllUsersController);
router.get("/message/:userId", getMessageByUserIdController);

export default router;
