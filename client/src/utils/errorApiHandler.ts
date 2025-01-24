import { useAlert } from "@/zustand/useAlert";
import { AxiosError } from "axios";

const errorApiHandler = (error: unknown) => {
  const { setAlertOption } = useAlert.getState();
  if (error instanceof AxiosError) {
    if (error.code === "ERR_CANCELED") {
      return;
    }

    setAlertOption({
      open: true,
      title: "API錯誤 請通知開發者",
      description: error.message,
    });
  }
};

export default errorApiHandler;
