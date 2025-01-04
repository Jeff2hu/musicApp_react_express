import { createSong, deleteSong } from "../service/admin.service.js";
import {
  BadRequestError,
  handleErrorResponse,
  handleSuccessResponse,
} from "../utils/apiResponse.js";

export const createSongController = async (req, res) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      throw new BadRequestError("Song and image are required");
    }

    const song = await createSong(req);

    return handleSuccessResponse(res, song);
  } catch (err) {
    handleErrorResponse(res, err);
  }
};

export const deleteSongController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new BadRequestError("Song id is required");
    }

    const song = await deleteSong(id);

    return handleSuccessResponse(res, song);
  } catch (err) {
    handleErrorResponse(res, err);
  }
};
