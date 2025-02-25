import { create } from "zustand";

export const useAuthStore = create<{
  userId: string | null;
  token: string | null;
  isAdmin: boolean;
  setToken: (token: string | null) => void;
  setIsAdmin: (isAdmin: boolean) => void;
  setUserId: (userId: string | null) => void;
}>((set) => ({
  isAdmin: false,
  token: null,
  userId: null,
  setToken: (token) => set({ token }),
  setIsAdmin: (isAdmin) => set({ isAdmin }),
  setUserId: (userId) => set({ userId }),
}));
