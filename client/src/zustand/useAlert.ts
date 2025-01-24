import { create } from "zustand";

interface AlertOption {
  open: boolean;
  title: string;
  description: string;
  onOk?: () => void
}

interface AlertState {
  alertOption: AlertOption;
  setAlertOption: (alertOption: AlertOption) => void;
}

export const useAlert = create<AlertState>((set) => ({
  alertOption: {
    open: false,
    title: "",
    description: "",
  },
  setAlertOption: (alertOption: AlertOption) => set({ alertOption }),
}));
