import { create } from "zustand";

interface SettingStore {
  language: string;
  isMobile: boolean;
  setLanguage: (language: string) => void;
  setIsMobile: (isMobile: boolean) => void;
}

export const useSettingStore = create<SettingStore>((set) => ({
  language: "zh",
  isMobile: false,
  setLanguage: (language) => set({ language }),
  setIsMobile: (isMobile) => set({ isMobile }),
}));
