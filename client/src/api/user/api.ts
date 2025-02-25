import { axiosInstance } from "@/lib/axios";
import { ApiResponse } from "@/type/apiResponse";
import { Message } from "@/type/message";
import { AuthCallBackRequest, AuthCallbackResponse, User } from "@/type/user";
import errorApiHandler from "@/utils/errorApiHandler";
import { useChatStore } from "@/zustand/useChatStore";
import { AxiosResponse } from "axios";
import { USER_API_PORTOCAL } from "./protocol";

const USER_BASE_URL = USER_API_PORTOCAL();

/**
 * Clerk callback
 * @param req AuthCallBackRequest
 * @returns AuthCallbackResponse
 */
export const authCallbackApi = async (req: AuthCallBackRequest) => {
  try {
    const res: AxiosResponse<ApiResponse<AuthCallbackResponse>> =
      await axiosInstance.post(USER_BASE_URL.AUTH_CALLBACK, req);
    return res.data.data;
  } catch (error) {
    throw errorApiHandler(error);
  }
};

/**
 * Get all users
 * @returns User[]
 */
export const getAllUsersApi = async ({ signal }: { signal?: AbortSignal }) => {
  try {
    const res: AxiosResponse<ApiResponse<User[]>> = await axiosInstance.get(
      USER_BASE_URL.GET_ALL_USERS,
      { signal }
    );
    return res.data.data;
  } catch (error) {
    throw errorApiHandler(error);
  }
};

export const getUserMessagesApi = async (
  userId: string,
  signal?: AbortSignal
) => {
  if (!userId) return null;

  const setMessages = useChatStore.getState().setMessages;
  try {
    const res: AxiosResponse<ApiResponse<Message[]>> = await axiosInstance.get(
      USER_BASE_URL.GET_USER_MESSAGES(userId),
      { signal }
    );

    setMessages(res.data.data);
    return res.data.data;
  } catch (error) {
    throw errorApiHandler(error);
  }
};
