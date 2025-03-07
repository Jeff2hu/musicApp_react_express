import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import AdminPage from "./pages/admin/AdminPage";
import AlbumPage from "./pages/album/AlbumPage";
import AuthCallbackPage from "./pages/authCallback/AuthCallbackPage";
import ChatPage from "./pages/chat/ChatPage";
import HomePage from "./pages/home/HomePage";
import SearchPage from "./pages/search/SearchPage";
import SettingPage from "./pages/setting/SettingPage";
import { useAuthStore } from "./zustand/useAuthStore";
import { useSettingStore } from "./zustand/useSettingsStore";

function App() {
  const isAdmin = useAuthStore((state) => state.isAdmin);
  const setIsMobile = useSettingStore((state) => state.setIsMobile);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // 初始載入時先執行一次判斷
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsMobile]);

  return (
    <Routes>
      <Route
        path="/sso-callback"
        element={
          <AuthenticateWithRedirectCallback
            signUpForceRedirectUrl={"/auth-callback"}
          />
        }
      />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      <Route path="/admin" element={<AdminPage />} />

      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/album/:albumId" element={<AlbumPage />} />
      </Route>

      <Route path="/search" element={<SearchPage />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
