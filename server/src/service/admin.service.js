import cloudinary from "../lib/cloudinary.js";
import Album from "../model/album.model.js";
import Song from "../model/song.model.js";
import { ServerError } from "../utils/apiResponse.js";

const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    throw new ServerError("Failed to upload to cloudinary");
  }
};

export const createSong = async (req) => {
  try {
    const { title, artist, albumId, duration } = req.body;
    const { audioFile, imageFile } = req.files;

    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);

    const newSong = await Song.create({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId: albumId || null,
    });

    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: newSong._id },
      });
    }

    return newSong;
  } catch (error) {
    throw error;
  }
};

export const deleteSong = async (id) => {
  try {
    // 先找到歌曲
    const song = await Song.findById(id);
    if (!song) {
      throw new ServerError("Song not found");
    }

    // 如果歌曲屬於某個專輯，先更新專輯
    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }

    // 最後刪除歌曲
    await Song.findByIdAndDelete(id);

    return song;
  } catch (error) {
    throw error;
  }
};
