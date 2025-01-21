import { useMutation } from "@tanstack/react-query";
import { authCallbackApi } from "./api";

export const useAuthCallback = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: authCallbackApi,
    onSuccess,
  });
};
