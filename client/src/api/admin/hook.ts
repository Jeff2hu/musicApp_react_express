import { useMutation } from "@tanstack/react-query";
import { postCreateSongApi, putUpdateSongApi } from "./api";
import { ADMIN_API_PORTOCAL } from "./protocol";

const ADMIN_BASE_URL = ADMIN_API_PORTOCAL();

export const useCreateSong = (successCallback: () => void) => {
  return useMutation({
    mutationFn: postCreateSongApi,
    onSuccess: successCallback,
  });
};

export const useUpdateSong = (successCallback: () => void) => {
  return useMutation({
    mutationFn: putUpdateSongApi,
    onSuccess: successCallback,
  });
};
