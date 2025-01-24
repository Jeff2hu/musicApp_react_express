import { useQuery } from "@tanstack/react-query";
import { getAlbumByIdApi, getAlbumsApi } from "./api";

export const useGetAlbums = () => {
  return useQuery({
    queryKey: ["album"],
    queryFn: getAlbumsApi,
  });
};

export const useGetAlbumById = (id?: string) => {
  return useQuery({
    queryKey: ["album", id],
    queryFn: ({ signal }) => {
      if (!id) throw new Error("Album ID is required");
      return getAlbumByIdApi({ signal, id });
    },
    enabled: Boolean(id),
  });
};
