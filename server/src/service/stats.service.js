import Album from "../model/album.model.js";
import Song from "../model/song.model.js";
import User from "../model/user.model.js";

export const getStatsService = async () => {
  try {
    const totalCount = await Promise.all([
      Song.countDocuments(),
      Album.countDocuments(),
      User.countDocuments(),
      Song.aggregate([
        {
          $unionWith: {
            coll: "albums",
            pipeline: [],
          },
        },
        { $group: { _id: "$artist" } },
        { $count: "count" },
      ]),
    ]);

    return totalCount;
  } catch (error) {
    throw error;
  }
};
