import { axiosInstance } from "@/lib/axios";
import { ApiResponse } from "@/type/apiResponse";
import { CreateSongRequest, Song, UpdateSongRequest } from "@/type/song";
import errorApiHandler from "@/utils/errorApiHandler";
import { useAuthStore } from "@/zustand/useAuthStore";
import { AxiosResponse } from "axios";
import { ADMIN_API_PORTOCAL } from "./protocol";

const ADMIN_BASE_URL = ADMIN_API_PORTOCAL();

/**
 * Check admin
 * @returns AuthCallbackResponse
 */
export const checkAdminApi = async (token: string) => {
  const { setIsAdmin, setToken } = useAuthStore.getState();
  try {
    const res: AxiosResponse<ApiResponse<boolean>> = await axiosInstance.get(
      ADMIN_BASE_URL.CHECK_ADMIN,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setIsAdmin(res.data.data);
    setToken(token);
  } catch (error) {
    errorApiHandler(error);
  }
};

export const postCreateSongApi = async (req: CreateSongRequest) => {
  try {
    const formData = new FormData();

    formData.append("title", req.title);
    formData.append("artist", req.artist);
    formData.append("duration", req.duration);
    if (req.albumId) formData.append("albumId", req.albumId);

    formData.append("imageFile", req.imageFile);
    formData.append("audioFile", req.audioFile);

    const res: AxiosResponse<ApiResponse<Song>> = await axiosInstance.post(
      ADMIN_BASE_URL.CREATE_SONG,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data.data;
  } catch (error) {
    throw errorApiHandler(error);
  }
};

export const putUpdateSongApi = async (req: UpdateSongRequest) => {
  try {
    const formData = new FormData();

    formData.append("title", req.title);
    formData.append("artist", req.artist);
    formData.append("duration", req.duration);
    if (req.albumId) formData.append("albumId", req.albumId);

    formData.append("imageFile", req.imageFile);
    formData.append("audioFile", req.audioFile);

    const res: AxiosResponse<ApiResponse<Song>> = await axiosInstance.put(
      ADMIN_BASE_URL.UPDATE_SONG(req.id),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data.data;
  } catch (error) {
    throw errorApiHandler(error);
  }
};
