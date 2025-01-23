import { useQuery } from "@tanstack/react-query";
import { getAlbumApi } from "./api";

export const useGetAlbum = () => {
  return useQuery({
    queryKey: ["album"],
    queryFn: getAlbumApi,
  });
};
