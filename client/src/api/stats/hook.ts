import { useQuery } from "@tanstack/react-query";
import { getStatsApi } from "./api";
import { STATS_API_PORTOCAL } from "./protocol";

const STATS_BASE_URL = STATS_API_PORTOCAL();

export const useGetStats = () => {
  return useQuery({
    queryKey: [STATS_BASE_URL.BASE_URL],
    queryFn: getStatsApi,
  });
};
