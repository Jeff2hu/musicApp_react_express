import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteSongApi,
  getSongFeaturedApi,
  getSongMadeForYouApi,
  getSongsApi,
  getSongTrendingApi,
} from "./api";
import { SONG_API_PORTOCAL } from "./protocol";

const SONG_BASE_URL = SONG_API_PORTOCAL();

export const useGetSongs = () => {
  return useQuery({
    queryKey: [SONG_BASE_URL.BASE_URL],
    queryFn: getSongsApi,
  });
};

export const useDeleteSong = (successCallback: () => void) => {
  return useMutation({
    mutationFn: deleteSongApi,
    onSuccess: successCallback,
  });
};

export const useGetSongFeatured = () => {
  return useQuery({
    queryKey: [SONG_BASE_URL.GET_SONG_FEATURED],
    queryFn: getSongFeaturedApi,
  });
};

export const useGetSongMadeForYou = () => {
  return useQuery({
    queryKey: [SONG_BASE_URL.GET_SONG_MADE_FOR_YOU],
    queryFn: getSongMadeForYouApi,
  });
};

export const useGetSongTrending = () => {
  return useQuery({
    queryKey: [SONG_BASE_URL.GET_SONG_TRENDING],
    queryFn: getSongTrendingApi,
  });
};
