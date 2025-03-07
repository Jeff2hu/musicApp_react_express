# Music App - 全端音樂串流應用

<h2 id="chinese">中文版本</h2>

一個使用 React (TypeScript) 和 Express.js 建構的全端音樂串流應用，具備即時聊天、音樂播放和管理員後台等功能。

## 技術架構

### 前端 (React + TypeScript)

- **核心技術**

  - React 18
  - TypeScript
  - Vite
  - React Router v6
  - React Hook Form
  - Zod
  - Zustand
  - TanStack Query

- **UI/樣式**

  - Tailwind CSS
  - Shadcn/ui
  - GSAP
  - Radix UI
  - Lucide Icons

- **身份驗證**

  - Clerk

- **API 通訊**
  - Axios
  - Socket.io Client

### 後端 (Node.js)

- **核心技術**

  - Express.js
  - MongoDB
  - Node.js

- **檔案處理**

  - Cloudinary (媒體儲存)
  - Express FileUpload

- **認證與安全**

  - Clerk/Express
  - CORS

- **即時功能**
  - Socket.io

## 專案結構

│<br>
├── client/ # React 前端<br>
│ ├── public/ # 公開資源目錄<br>
│ ├── src/<br>
│ │ ├── api/ # API 請求和通訊相關<br>
│ │ ├── assets/ # 靜態資源（圖片、字體等）<br>
│ │ ├── components/ # 可重用的 UI 組件<br>
│ │ ├── layout/ # 頁面布局組件<br>
│ │ ├── lib/ # 第三方庫配置<br>
│ │ ├── pages/ # 頁面組件<br>
│ │ ├── provider/ # React Context 提供者<br>
│ │ ├── type/ # TypeScript 類型定義<br>
│ │ ├── utils/ # 工具函數<br>
│ │ ├── zod/ # Zod 驗證模式<br>
│ │ ├── zustand/ # 狀態管理存儲<br>
│ │ ├── App.tsx # 應用程序根組件<br>
│ │ ├── main.tsx # 應用程序入口點<br>
│<br>
└── server/ # Express 後端<br>
│ ├── routes/<br>
│ ├── controllers/<br>
│ ├── models/<br>
│ ├── services/<br>
│ ├── utils/<br>
│ ├── app.js<br>
