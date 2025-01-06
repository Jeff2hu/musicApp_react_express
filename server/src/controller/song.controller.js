import {
  getAllSongs,
  getFeaturedSongs,
  getMadeForYouSongs,
  getTrendingSongs,
} from "../service/song.service.js";

export const getAllSongsController = async (req, res) => {
  try {
    const songs = await getAllSongs();

    res
      .status(200)
      .json({ message: "Songs fetched successfully", data: songs });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getFeaturedSongController = async (req, res) => {
  try {
    const songs = await getFeaturedSongs();

    res
      .status(200)
      .json({ message: "Featured songs fetched successfully", data: songs });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMadeForYouSongController = async (req, res) => {
  try {
    const songs = await getMadeForYouSongs();

    res.status(200).json({
      message: "Made for you songs fetched successfully",
      data: songs,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTrendingSongController = async (req, res) => {
  try {
    const songs = await getTrendingSongs();

    res
      .status(200)
      .json({ message: "Trending songs fetched successfully", data: songs });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
