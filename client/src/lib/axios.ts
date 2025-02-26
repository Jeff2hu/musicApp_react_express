import { checkAdminApi } from "@/api/admin/api";
import { useAuthStore } from "@/zustand/useAuthStore";
import axios from "axios";

// 建立一個全域變數來存儲 getToken 函數
let clerkGetToken: (() => Promise<string | null>) | null = null;

// 提供一個方法來設置 getToken 函數
export const setClerkGetToken = (getToken: () => Promise<string | null>) => {
  clerkGetToken = getToken;
};

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const userId = useAuthStore.getState().userId;

    if (
      userId &&
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      // 清除當前的認證狀態
      useAuthStore.getState().setToken(null);
      useAuthStore.getState().setIsAdmin(false);
      useAuthStore.getState().setUserId(null);

      try {
        if (!clerkGetToken) {
          throw new Error("Clerk getToken function not set");
        }

        // 使用 Clerk 獲取新的 token
        const newToken = await clerkGetToken();

        if (newToken) {
          await checkAdminApi(newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          // 重試原始請求
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
