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
