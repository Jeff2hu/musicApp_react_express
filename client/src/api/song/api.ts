import { axiosInstance } from "@/lib/axios";
import { ApiResponse } from "@/type/apiResponse";
import { SongLite } from "@/type/song";
import errorApiHandler from "@/utils/errorApiHandler";
import { AxiosResponse } from "axios";
import { SONG_API_PORTOCAL } from "./protocol";

const SONG_BASE_URL = SONG_API_PORTOCAL();

export const getSongFeaturedApi = async () => {
  try {
    const res: AxiosResponse<ApiResponse<SongLite[]>> = await axiosInstance.get(
      SONG_BASE_URL.GET_SONG_FEATURED
    );

    return res.data.data;
  } catch (error) {
    errorApiHandler(error);
  }
};

export const getSongMadeForYouApi = async () => {
  try {
    const res: AxiosResponse<ApiResponse<SongLite[]>> = await axiosInstance.get(
      SONG_BASE_URL.GET_SONG_MADE_FOR_YOU
    );

    return res.data.data;
  } catch (error) {
    errorApiHandler(error);
  }
};

export const getSongTrendingApi = async () => {
  try {
    const res: AxiosResponse<ApiResponse<SongLite[]>> = await axiosInstance.get(
      SONG_BASE_URL.GET_SONG_TRENDING
    );

    return res.data.data;
  } catch (error) {
    errorApiHandler(error);
  }
};
