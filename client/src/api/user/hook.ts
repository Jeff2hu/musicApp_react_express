import { useMutation, useQuery } from "@tanstack/react-query";
import { authCallbackApi, getAllUsersApi, getUserMessagesApi } from "./api";
import { USER_API_PORTOCAL } from "./protocol";

const USER_BASE_URL = USER_API_PORTOCAL();

export const useAuthCallback = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: authCallbackApi,
    onSuccess,
  });
};

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: [USER_BASE_URL.GET_ALL_USERS],
    queryFn: getAllUsersApi,
    retry: false,
  });
};

export const useGetUserMessages = (userId: string) => {
  return useQuery({
    queryKey: [USER_BASE_URL.GET_USER_MESSAGES(userId)],
    queryFn: ({ signal }) => getUserMessagesApi(userId, signal),
    enabled: !!userId,
  });
};
