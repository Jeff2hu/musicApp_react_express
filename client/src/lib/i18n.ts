import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../locales/en.json";
import ja from "../locales/ja.json";
import zh from "../locales/zh.json";

// 定義翻譯內容
const resources = {
  en: {
    translation: en,
  },
  zh: {
    translation: zh,
  },
  ja: {
    translation: ja,
  },
};

// 初始化 i18next
i18n.use(initReactI18next).init({
  resources,
  lng: "zh", // 預設語言
  fallbackLng: "zh", // 如果語言找不到，則回退到中文
  interpolation: {
    escapeValue: false, // React 已經具備 XSS 防護，不需要額外 escape
  },
});

export default i18n;
