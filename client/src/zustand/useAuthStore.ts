import { create } from "zustand";

export const useAuthStore = create<{
  token: string | null;
  setToken: (token: string | null) => void;
}>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
}));
