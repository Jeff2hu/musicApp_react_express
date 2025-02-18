import { getStatsService } from "../service/stats.service.js";

export const getStatsController = async (req, res, next) => {
  try {
    const { totalSongs, totalAlbums, totalUsers, totalArtists } =
      await getStatsService();

    res.status(200).json({
      data: {
        totalSongs,
        totalAlbums,
        totalUsers,
        totalArtists: totalArtists[0]?.count || 0,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
