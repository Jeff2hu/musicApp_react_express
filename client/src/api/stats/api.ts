import { axiosInstance } from "@/lib/axios";
import { ApiResponse } from "@/type/apiResponse";
import { StatsCount } from "@/type/stats";
import errorApiHandler from "@/utils/errorApiHandler";
import useMusicStore from "@/zustand/useMusicStore";
import { AxiosResponse } from "axios";
import { STATS_API_PORTOCAL } from "./protocol";

const STATS_BASE_URL = STATS_API_PORTOCAL();

export const getStatsApi = async ({ signal }: { signal: AbortSignal }) => {
  try {
    const { setStats } = useMusicStore.getState();
    const res: AxiosResponse<ApiResponse<StatsCount>> = await axiosInstance.get(
      STATS_BASE_URL.BASE_URL,
      {
        signal,
      }
    );

    setStats(res.data.data);
    return res.data.data;
  } catch (error) {
    errorApiHandler(error);
  }
};
