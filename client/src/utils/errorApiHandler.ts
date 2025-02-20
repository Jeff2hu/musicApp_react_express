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
      title: `API錯誤 請通知開發者 (${error.status})`,
      description: error.response?.data.message || "Something went wrong",
    });
  }
  return Promise.reject(error);
};

export default errorApiHandler;
