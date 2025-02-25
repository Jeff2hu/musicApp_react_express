import { Song } from "@/type/song";
import { User } from "@/type/user";
import { io, Socket } from "socket.io-client";
import { create } from "zustand";
import { Message } from "../type/message";
import { useAuthStore } from "./useAuthStore";

type ChatStore = {
  messages: Message[];
  socket: Socket | null;
  isConnected: boolean;
  onlineUsers: Set<string>;
  userActivities: Map<string, { activity: string; [key: string]: any }>;
  selectedUser: User | null;

  setMessages: (messages: Message[]) => void;
  initSocket: (userId: string) => void;
  disconnectSocket: () => void;
  sendMessage: (senderId: string, receiverId: string, content: string) => void;
  setSelectedUser: (user: User) => void;
  sendActivity: (song: Song) => void;
};

const socket = io(import.meta.env.VITE_SOCKET_URL, {
  autoConnect: false,
  withCredentials: true,
});

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  socket: null,
  isConnected: false,
  onlineUsers: new Set(),
  userActivities: new Map(),
  selectedUser: null,
  setSelectedUser: (selectedUser: User) => set({ selectedUser }),
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
      socket.on(
        "user_activity",
        (activities: [string, { activity: string; [key: string]: any }][]) => {
          console.log(activities);
          const userActivities = new Map(activities);
          set({ userActivities });
        }
      );
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
        ({
          userId,
          activity,
        }: {
          userId: string;
          activity: { activity: string; [key: string]: any };
        }) => {
          const userActivities = new Map(get().userActivities);
          userActivities.set(userId, activity);
          set({ userActivities });
        }
      );
      set({ isConnected: true, socket });
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

  sendActivity: (song: Song) => {
    const socket = get().socket;
    const authStore = useAuthStore.getState();

    if (socket && authStore.userId) {
      socket.emit("update_activity", {
        userId: authStore.userId,
        activity: {
          activity: "MUSIC",
          song: song,
        },
      });
    }
  },
}));
