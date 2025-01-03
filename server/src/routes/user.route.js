import express from "express";
import User from "../model/user.model.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.post("/test", async (req, res) => {
  const testUser = new User({
    fullName: "測試用戶",
    imageUrl: "https://example.com/image.jpg",
    clerkId: "test123",
  });
  await testUser.save();
  res.status(201).json({ message: "測試用戶創建成功" });
});

export default router;
