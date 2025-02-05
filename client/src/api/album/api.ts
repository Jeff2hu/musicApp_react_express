import { axiosInstance } from "@/lib/axios";
import { Album } from "@/type/album";
import { ApiResponse } from "@/type/apiResponse";
import errorApiHandler from "@/utils/errorApiHandler";
import useMusicStore from "@/zustand/useMusicStore";
import { AxiosResponse } from "axios";
import { ALBUM_API_PORTOCAL } from "./protocol";

const ALBUM_BASE_URL = ALBUM_API_PORTOCAL();

/**
 * Get all albums
 * @param signal AbortSignal
 * @returns Album[]
 */
export const getAlbumsApi = async ({ signal }: { signal: AbortSignal }) => {
  try {
    const { setAlbums } = useMusicStore.getState();

    const res: AxiosResponse<ApiResponse<Album[]>> = await axiosInstance.get(
      ALBUM_BASE_URL.GET_ALBUM,

      {
        signal,
      }
    );

    setAlbums(res.data.data);
    return res.data.data;
  } catch (error) {
    errorApiHandler(error);
  }
};

/**
 * Get album by id
 * @param signal AbortSignal
 * @param id string
 * @returns Album
 */
export const getAlbumByIdApi = async ({
  signal,
  id,
}: {
  signal: AbortSignal;
  id: string;
}) => {
  try {
    const res: AxiosResponse<ApiResponse<Album>> = await axiosInstance.get(
      ALBUM_BASE_URL.GET_ALBUM_BY_ID(id),
      {
        signal,
      }
    );
    return res.data.data;
  } catch (error) {
    errorApiHandler(error);
  }
};
