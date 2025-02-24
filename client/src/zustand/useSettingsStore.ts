import { create } from "zustand";

interface SettingStore {
  language: string;
  setLanguage: (language: string) => void;
}

export const useSettingStore = create<SettingStore>((set) => ({
  language: "zh",
  setLanguage: (language) => set({ language }),
}));
