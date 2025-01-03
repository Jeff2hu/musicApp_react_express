import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./lib/mongoDb.js";

import adminRoutes from "./routes/admin.route.js";
import albumRoutes from "./routes/album.route.js";
import authRoutes from "./routes/auth.route.js";
import songRoutes from "./routes/song.route.js";
import statsRoutes from "./routes/stats.route.js";
import userRoutes from "./routes/user.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statsRoutes);

app.listen(port, async () => {
  await connectDB();
  console.log(`Server is running on port ${port}`);
});
