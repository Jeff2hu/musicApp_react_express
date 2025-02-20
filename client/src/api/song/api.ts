import { axiosInstance } from "@/lib/axios";
import { ApiResponse } from "@/type/apiResponse";
import { Song, SongLite } from "@/type/song";
import errorApiHandler from "@/utils/errorApiHandler";
import useMusicStore from "@/zustand/useMusicStore";
import { AxiosResponse } from "axios";
import { SONG_API_PORTOCAL } from "./protocol";

const SONG_BASE_URL = SONG_API_PORTOCAL();

export const getSongsApi = async ({ signal }: { signal: AbortSignal }) => {
  try {
    const { setSongs } = useMusicStore.getState();
    const res: AxiosResponse<ApiResponse<Song[]>> = await axiosInstance.get(
      SONG_BASE_URL.BASE_URL,
      {
        signal,
      }
    );

    setSongs(res.data.data);
    return res.data.data;
  } catch (error) {
    errorApiHandler(error);
  }
};

export const deleteSongApi = async ({ id }: { id: string }) => {
  try {
    const res: AxiosResponse<ApiResponse<SongLite[]>> =
      await axiosInstance.delete(SONG_BASE_URL.BASE_URL + "/" + id);

    return res.data.data;
  } catch (error) {
    errorApiHandler(error);
  }
};

export const getSongFeaturedApi = async ({
  signal,
}: {
  signal: AbortSignal;
}) => {
  try {
    const res: AxiosResponse<ApiResponse<SongLite[]>> = await axiosInstance.get(
      SONG_BASE_URL.GET_SONG_FEATURED,
      {
        signal,
      }
    );

    return res.data.data;
  } catch (error) {
    errorApiHandler(error);
  }
};

export const getSongMadeForYouApi = async ({
  signal,
}: {
  signal: AbortSignal;
}) => {
  try {
    const res: AxiosResponse<ApiResponse<SongLite[]>> = await axiosInstance.get(
      SONG_BASE_URL.GET_SONG_MADE_FOR_YOU,
      {
        signal,
      }
    );

    return res.data.data;
  } catch (error) {
    errorApiHandler(error);
  }
};

export const getSongTrendingApi = async ({
  signal,
}: {
  signal: AbortSignal;
}) => {
  try {
    const res: AxiosResponse<ApiResponse<SongLite[]>> = await axiosInstance.get(
      SONG_BASE_URL.GET_SONG_TRENDING,
      {
        signal,
      }
    );

    return res.data.data;
  } catch (error) {
    errorApiHandler(error);
  }
};
