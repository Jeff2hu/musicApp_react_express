import User from "../model/user.model.js";

export const getAllUsers = async (currentUserId) => {
  try {
    const users = await User.find({ clerkId: { $ne: currentUserId } });
    return users;
  } catch (error) {
    throw error;
  }
};
