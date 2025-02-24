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

    const audioFile = req.files?.audioFile || req.body?.audioFile;
    const imageFile = req.files?.imageFile || req.body?.imageFile;

    const song = await Song.findById(id);

    if (!song) {
      throw new Error("Song not found");
    }

    // 如果原本有專輯，且新的專輯ID不同，從原專輯移除這首歌
    if (song.albumId && song.albumId.toString() !== albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }

    // 如果有新的專輯ID，且與原本的不同，將歌曲加入新專輯
    if (albumId && song.albumId?.toString() !== albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    }

    const audioUrl =
      typeof audioFile === "string"
        ? audioFile
        : await uploadToCloudinary(audioFile);
    const imageUrl =
      typeof imageFile === "string"
        ? imageFile
        : await uploadToCloudinary(imageFile);

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

export const updateAlbum = async (id, req) => {
  try {
    const { title, artist, releaseYear } = req.body;

    const imageFile = req.files?.imageFile || req.body?.imageFile;

    const imageUrl =
      typeof imageFile === "string"
        ? imageFile
        : await uploadToCloudinary(imageFile);

    const album = await Album.findById(id);

    if (!album) {
      throw new Error("Album not found");
    }

    const updatedAlbum = await Album.findByIdAndUpdate(id, {
      title,
      artist,
      imageUrl,
      releaseYear,
    });

    return updatedAlbum;
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
