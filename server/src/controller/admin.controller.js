import {
  createAlbum,
  createSong,
  deleteAlbum,
  deleteSong,
  updateSong,
} from "../service/admin.service.js";

export const checkAdminController = async (req, res, next) => {
  try {
    res.status(200).json({ message: "Admin check success", data: true });
  } catch (err) {
    next(err);
  }
};

export const createSongController = async (req, res, next) => {
  try {
    const { title, artist, duration } = req.body;

    if (!title || !artist || !duration) {
      res.status(400).json({ message: "Invalid request" });
      return;
    }

    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      res.status(400).json({ message: "AudioFile and ImageFile are required" });
      return;
    }

    const song = await createSong(req);

    res.status(200).json({ message: "Song created successfully", data: song });
  } catch (err) {
    next(err);
  }
};

export const updateSongController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, artist, duration } = req.body;

    if (!id) {
      res.status(400).json({ message: "Song id is required" });
      return;
    }

    if (!title || !artist || !duration) {
      res.status(400).json({ message: "Invalid request" });
      return;
    }

    if (
      (!req.files?.audioFile && !req.body?.audioFile) ||
      (!req.files?.imageFile && !req.body?.imageFile)
    ) {
      res.status(400).json({ message: "AudioFile and ImageFile are required" });
      return;
    }

    const song = await updateSong(id, req);

    res.status(200).json({ message: "Song updated successfully", data: song });
  } catch (err) {
    next(err);
  }
};

export const deleteSongController = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "Song id is required" });
      return;
    }

    await deleteSong(id);

    res.status(200).json({ message: "Song deleted successfully", data: null });
  } catch (err) {
    next(err);
  }
};

export const createAlbumController = async (req, res, next) => {
  try {
    const { title, artist, releaseYear } = req.body;

    if (!title || !artist || !releaseYear) {
      res.status(400).json({ message: "Invalid request" });
      return;
    }

    if (!req.files || !req.files.imageFile) {
      res.status(400).json({ message: "ImageFile is required" });
      return;
    }

    const album = await createAlbum(req);

    res
      .status(200)
      .json({ message: "Album created successfully", data: album });
  } catch (err) {
    next(err);
  }
};

export const deleteAlbumController = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "Album id is required" });
      return;
    }

    await deleteAlbum(id);

    res.status(200).json({ message: "Album deleted successfully", data: null });
  } catch (err) {
    next(err);
  }
};
