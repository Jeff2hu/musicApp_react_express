import { getMessageByUserId } from "../service/message.service.js";
import { getAllUsers } from "../service/user.service.js";

export const getAllUsersController = async (req, res) => {
  try {
    const currentUserId = req.auth.userId;
    const users = await getAllUsers(currentUserId);
    res
      .status(200)
      .json({ message: "Users fetched successfully", data: users });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessageByUserIdController = async (req, res) => {
  try {
    const currentUserId = req.auth.userId;
    const { userId } = req.params;
    const messages = await getMessageByUserId(currentUserId, userId);
    res
      .status(200)
      .json({ message: "Messages fetched successfully", data: messages });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
