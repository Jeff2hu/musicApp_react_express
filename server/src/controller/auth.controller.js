import { callbackService } from "../service/auth.service.js";

export const callbackController = async (req, res, next) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    if (!id || !firstName || !lastName || !imageUrl) {
      res.status(400).json({ message: "Invalid request" });
      return;
    }

    const existingUser = await callbackService(req.body);
    res
      .status(200)
      .json({ message: "User created successfully", data: existingUser });
  } catch (error) {
    next(error);
  }
};
