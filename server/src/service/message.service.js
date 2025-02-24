import Message from "../model/message.model.js";

export const createMessage = async (messageData) => {
  try {
    const message = await Message.create(messageData);
    return message;
  } catch (error) {
    throw new Error(error);
  }
};

export const getMessageByUserId = async (currentUserId, userId) => {
  try {
    const messages = await Message.find({
      $or: [
        { senderId: currentUserId, receiverId: userId },
        { senderId: userId, receiverId: currentUserId },
      ],
    }).sort({ createdAt: 1 });

    return messages;
  } catch (error) {
    throw new Error(error);
  }
};
