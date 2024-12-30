const express = require("express");
const app = express();
const port = 4500;
const cors = require("cors");

// 使用 express.json() 中間件來解析 JSON 請求
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // 明確指定允許的源
    credentials: true, // 允許攜帶認證資訊
    methods: ["GET", "POST"], // 允許的 HTTP 方法
    allowedHeaders: ["Content-Type", "Authorization"], // 允許的 headers
  })
);

// 啟動伺服器
app.listen(port, async () => {
  console.log(`伺服器運行在 http://localhost:${port}`);
});
