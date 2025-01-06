import { getStatsService } from "../service/stats.service.js";

export const getStatsController = async (req, res, next) => {
  try {
    const { totalSongs, totalAlbums, totalUsers, uniqueArtists } =
      await getStatsService();

    res.status(200).json({
      data: {
        totalSongs,
        totalAlbums,
        totalUsers,
        totalArtists: uniqueArtists[0].count || 0,
      },
    });
  } catch (error) {
    next(error);
  }
};
