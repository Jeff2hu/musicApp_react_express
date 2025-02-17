import { axiosInstance } from "@/lib/axios";
import { ApiResponse } from "@/type/apiResponse";
import errorApiHandler from "@/utils/errorApiHandler";
import { useAuthStore } from "@/zustand/useAuthStore";
import { AxiosResponse } from "axios";
import { ADMIN_API_PORTOCAL } from "./protocol";

const ADMIN_BASE_URL = ADMIN_API_PORTOCAL();

/**
 * Check admin
 * @returns AuthCallbackResponse
 */
export const checkAdminApi = async (token: string) => {
  const { setIsAdmin, setToken } = useAuthStore.getState();
  try {
    const res: AxiosResponse<ApiResponse<boolean>> = await axiosInstance.get(
      ADMIN_BASE_URL.CHECK_ADMIN,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setIsAdmin(res.data.data);
    setToken(token);
  } catch (error) {
    errorApiHandler(error);
  }
};
