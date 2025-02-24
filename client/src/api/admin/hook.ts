import { useMutation } from "@tanstack/react-query";
import {
  deleteAlbumApi,
  deleteSongApi,
  postCreateAlbumApi,
  postCreateSongApi,
  putUpdateAlbumApi,
  putUpdateSongApi,
} from "./api";

export const useCreateSong = (successCallback: () => void) => {
  return useMutation({
    mutationFn: postCreateSongApi,
    onSuccess: successCallback,
  });
};

export const useDeleteSong = (successCallback: () => void) => {
  return useMutation({
    mutationFn: deleteSongApi,
    onSuccess: successCallback,
  });
};

export const useUpdateSong = (successCallback: () => void) => {
  return useMutation({
    mutationFn: putUpdateSongApi,
    onSuccess: successCallback,
  });
};

export const useCreateAlbum = (successCallback: () => void) => {
  return useMutation({
    mutationFn: postCreateAlbumApi,
    onSuccess: successCallback,
  });
};

export const useDeleteAlbum = (successCallback: () => void) => {
  return useMutation({
    mutationFn: deleteAlbumApi,
    onSuccess: successCallback,
  });
};

export const useUpdateAlbum = (successCallback: () => void) => {
  return useMutation({
    mutationFn: putUpdateAlbumApi,
    onSuccess: successCallback,
  });
};
