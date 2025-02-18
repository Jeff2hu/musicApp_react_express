import Song from "../model/song.model.js";

export const getAllSongs = async () => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    return songs;
  } catch (error) {
    throw error;
  }
};

export const getFeaturedSongs = async () => {
  try {
    const songs = await Song.aggregate([
      { $sample: { size: 6 } },
      { $project: { _id: 1, title: 1, artist: 1, imageUrl: 1, audioUrl: 1 } },
    ]);
    return songs;
  } catch (error) {
    throw error;
  }
};

export const getMadeForYouSongs = async () => {
  try {
    const songs = await Song.aggregate([
      { $sample: { size: 4 } },
      { $project: { _id: 1, title: 1, artist: 1, imageUrl: 1, audioUrl: 1 } },
    ]);
    return songs;
  } catch (error) {
    throw error;
  }
};

export const getTrendingSongs = async () => {
  try {
    const songs = await Song.aggregate([
      { $sample: { size: 4 } },
      { $project: { _id: 1, title: 1, artist: 1, imageUrl: 1, audioUrl: 1 } },
    ]);
    return songs;
  } catch (error) {
    throw error;
  }
};
