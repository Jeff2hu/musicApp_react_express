import { create } from "zustand";

export const useAuthStore = create<{
  token: string | null;
  isAdmin: boolean;
  setToken: (token: string | null) => void;
  setIsAdmin: (isAdmin: boolean) => void;
}>((set) => ({
  isAdmin: false,
  token: null,
  setToken: (token) => set({ token }),
  setIsAdmin: (isAdmin) => set({ isAdmin }),
}));
