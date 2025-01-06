import { getAlbumById, getAllAlbums } from "../service/album.service.js";

export const getAllAlbumController = async (req, res, next) => {
  try {
    const albums = await getAllAlbums();
    res
      .status(200)
      .json({ message: "Album fetched successfully", data: albums });
  } catch (err) {
    next(err);
  }
};

export const getAlbumByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Album id is required" });
    }

    const album = await getAlbumById(id);

    res
      .status(200)
      .json({ message: "Album fetched successfully", data: album });
  } catch (err) {
    next(err);
  }
};
