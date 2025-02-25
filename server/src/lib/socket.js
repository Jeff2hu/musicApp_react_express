import { Server } from "socket.io";
import { createMessage } from "../service/message.service.js";

export const initSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  const userSockets = new Map(); // {userId: socketId}
  const userActivities = new Map(); // {userId: activity}

  io.on("connection", (socket) => {
    socket.on("user_connected", (userId) => {
      userSockets.set(userId, socket.id);
      userActivities.set(userId, { activity: "IDLE" });

      io.emit("user_connected", Array.from(userSockets.keys()));
      socket.emit("user_online", Array.from(userSockets.keys()));
      io.emit("user_activity", Array.from(userActivities.entries()));
    });

    socket.on("update_activity", ({ userId, activity }) => {
      userActivities.set(userId, activity);
      io.emit("user_activity", Array.from(userActivities.entries()));
    });

    socket.on("send_message", async (messageData) => {
      try {
        const { senderId, receiverId, content } = messageData;
        const message = await createMessage(messageData);

        const receiverSocketId = userSockets.get(receiverId);

        if (receiverSocketId) {
          io.to(receiverSocketId).emit("receive_message", message);
        }

        socket.emit("message_sent", message);
      } catch (error) {
        console.error("Error sending message:", error);
        socket.emit("message_error", error.message);
      }
    });

    socket.on("disconnect", () => {
      const userId = Array.from(userSockets.keys()).find(
        (id) => userSockets.get(id) === socket.id
      );
      if (userId) {
        userSockets.delete(userId);
        userActivities.delete(userId);
        io.emit("user_disconnected", userId);
      }
    });
  });
};
