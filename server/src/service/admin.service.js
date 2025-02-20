import cloudinary from "../lib/cloudinary.js";
import Album from "../model/album.model.js";
import Song from "../model/song.model.js";

const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    throw new Error("Failed to upload to cloudinary");
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

export const updateSong = async (id, req) => {
  try {
    const { title, artist, albumId, duration } = req.body;
    const { audioFile, imageFile } = req.files;

    const song = await Song.findById(id);

    if (!song) {
      throw new Error("Song not found");
    }

    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);

    const updatedSong = await Song.findByIdAndUpdate(id, {
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId: albumId || null,
    });

    return updatedSong;
  } catch (error) {
    throw error;
  }
};

export const deleteSong = async (id) => {
  try {
    const song = await Song.findById(id);

    if (!song) {
      throw new Error("Song not found");
    }

    // 如果歌曲屬於某個專輯，先更新專輯
    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }

    // 最後刪除歌曲
    await Song.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};

export const createAlbum = async (req) => {
  try {
    const { title, artist, releaseYear } = req.body;
    const { imageFile } = req.files;

    const imageUrl = await uploadToCloudinary(imageFile);

    const newAlbum = await Album.create({
      title,
      artist,
      imageUrl,
      releaseYear,
    });

    return newAlbum;
  } catch (error) {
    throw error;
  }
};

export const deleteAlbum = async (id) => {
  try {
    await Song.deleteMany({ albumId: id });
    await Album.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};
