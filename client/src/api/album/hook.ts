import { useQuery } from "@tanstack/react-query";
import { getAlbumByIdApi, getAlbumsApi } from "./api";
import { ALBUM_API_PORTOCAL } from "./protocol";

const ALBUM_BASE_URL = ALBUM_API_PORTOCAL();

export const useGetAlbums = () => {
  return useQuery({
    queryKey: [ALBUM_BASE_URL.GET_ALBUM],
    queryFn: getAlbumsApi,
  });
};

export const useGetAlbumById = (id?: string) => {
  if (!id) throw new Error("Album ID is required");

  return useQuery({
    queryKey: [ALBUM_BASE_URL.GET_ALBUM, id],
    queryFn: ({ signal }) => getAlbumByIdApi({ signal, id }),
    enabled: Boolean(id),
  });
};
