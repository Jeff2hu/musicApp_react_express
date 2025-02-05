import express from "express";
import { getAllUsersController } from "../controller/user.controller.js";

const router = express.Router();
//protectMiddleware
router.get("/", getAllUsersController);

export default router;
