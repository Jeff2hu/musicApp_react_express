import { axiosInstance } from "@/lib/axios";
import { ApiResponse } from "@/type/apiResponse";
import { AuthCallBackRequest, AuthCallbackResponse } from "@/type/user";
import errorApiHandler from "@/utils/errorApiHandler";
import { AxiosResponse } from "axios";
import { USER_API_PORTOCAL } from "./protocol";

const USER_BASE_URL = USER_API_PORTOCAL();

export const authCallbackApi = async (req: AuthCallBackRequest) => {
  try {
    const res: AxiosResponse<ApiResponse<AuthCallbackResponse>> =
      await axiosInstance.post(USER_BASE_URL.AUTH_CALLBACK, req);
    return res.data.data;
  } catch (error) {
    errorApiHandler(error);
  }
};
