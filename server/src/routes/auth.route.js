import express from "express";
import { callbackController } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/callback", callbackController);

export default router;
