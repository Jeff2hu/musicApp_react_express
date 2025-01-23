import { axiosInstance } from "@/lib/axios";
import { ApiResponse } from "@/type/apiResponse";
import { AxiosResponse } from "axios";
import { ALBUM_API_PORTOCAL } from "./protocol";

const ALBUM_BASE_URL = ALBUM_API_PORTOCAL();

export const getAlbumApi = async ({ signal }: { signal: AbortSignal }) => {
  try {
    const res: AxiosResponse<ApiResponse<any>> = await axiosInstance.get(
      ALBUM_BASE_URL.GET_ALBUM,
      {
        signal,
      }
    );
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
