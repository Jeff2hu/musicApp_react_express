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
export const checkAdminApi = async () => {
  const { setIsAdmin } = useAuthStore.getState();
  try {
    const res: AxiosResponse<ApiResponse<boolean>> = await axiosInstance.get(
      ADMIN_BASE_URL.CHECK_ADMIN
    );

    setIsAdmin(res.data.data);
  } catch (error) {
    errorApiHandler(error);
  }
};
