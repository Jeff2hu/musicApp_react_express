import Album from "../model/album.model.js";

export const getAllAlbums = async () => {
  try {
    const albums = await Album.find({});
    return albums;
  } catch (error) {
    throw error;
  }
};

export const getAlbumById = async (id) => {
  try {
    const album = await Album.findById(id).populate("songs");

    if (!album) {
      throw new Error("Album not found");
    }

    return album;
  } catch (error) {
    throw error;
  }
};
