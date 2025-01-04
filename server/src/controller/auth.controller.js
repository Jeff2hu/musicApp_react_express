import { callbackService } from "../service/auth.service.js";
import {
  BadRequestError,
  handleErrorResponse,
  handleSuccessResponse,
} from "../utils/apiResponse.js";

export const callbackController = async (req, res) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    if (!id || !firstName || !lastName || !imageUrl) {
      throw new BadRequestError("Invalid request");
    }

    const existingUser = await callbackService(req.body);
    handleSuccessResponse(res, existingUser, "User created successfully");
  } catch (err) {
    handleErrorResponse(res, err.message);
  }
};
