import { User } from "@/type/user";
import { io, Socket } from "socket.io-client";
import { create } from "zustand";
import { Message } from "../type/message";

type ChatStore = {
  users: User[];
  messages: Message[];
  socket: Socket | null;
  isConnected: boolean;
  onlineUsers: Set<string>;
  userActivities: Map<string, string>;

  setMessages: (messages: Message[]) => void;
  initSocket: (userId: string) => void;
  disconnectSocket: () => void;
  sendMessage: (senderId: string, receiverId: string, content: string) => void;
};

const socket = io(import.meta.env.VITE_SOCKET_URL, {
  autoConnect: false,
  withCredentials: true,
});

export const useChatStore = create<ChatStore>((set, get) => ({
  users: [],
  messages: [],
  socket: null,
  isConnected: false,
  onlineUsers: new Set(),
  userActivities: new Map(),

  setMessages: (messages: Message[]) => set({ messages }),
  initSocket: (userId: string) => {
    socket.auth = { userId };
    if (!get().isConnected) {
      socket.connect();
      socket.emit("user_connected", userId);
      socket.on("user_online", (userIds: string[]) => {
        const onlineUsers = new Set(userIds);
        set({ onlineUsers });
      });
      socket.on("user_activity", (activities: [string, string][]) => {
        const userActivities = new Map(activities);
        set({ userActivities });
      });
      socket.on("user_connected", (userIds: string[]) => {
        const onlineUsers = new Set(userIds);
        set({ onlineUsers });
      });
      socket.on("user_disconnected", (userId: string) => {
        const onlineUsers = new Set(get().onlineUsers);
        onlineUsers.delete(userId);
        set({ onlineUsers });
      });
      socket.on("receive_message", (message: Message) => {
        set((state) => ({ messages: [...state.messages, message] }));
      });
      socket.on("message_sent", (message: Message) => {
        set((state) => ({ messages: [...state.messages, message] }));
      });
      socket.on(
        "activity_updated",
        ({ userId, activity }: { userId: string; activity: string }) => {
          const userActivities = new Map(get().userActivities);
          userActivities.set(userId, activity);
          set({ userActivities });
        }
      );
      set({ isConnected: true });
    }
  },
  disconnectSocket: () => {
    if (get().isConnected) {
      socket.disconnect();
      set({ isConnected: false });
    }
  },

  sendMessage: (senderId: string, receiverId: string, content: string) => {
    const socket = get().socket;
    if (socket) {
      socket.emit("send_message", { senderId, receiverId, content });
    }
  },
}));
