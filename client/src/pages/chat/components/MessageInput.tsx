import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAlert } from "@/zustand/useAlert";
import { useChatStore } from "@/zustand/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const MessageInput = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  const { setAlertOption } = useAlert();
  const { selectedUser, sendMessage } = useChatStore();
  const [newMessage, setNewMassage] = useState("");

  const sendHandler = () => {
    if (!selectedUser || !user) {
      setAlertOption({
        open: true,
        title: "Error",
        description: t("CHAT.PLEASE_LOGIN_OR_SELECT_A_USER"),
      });
      setNewMassage("");
      return;
    }

    sendMessage(user.id, selectedUser.clerkId, newMessage);
    setNewMassage("");
  };

  return (
    <div className="p-4 mt-auto border-t border-zinc-600">
      <div className="flex gap-2">
        <Input
          placeholder={t("CHAT.MESSAGE_PLACEHOLDER")}
          value={newMessage}
          onChange={(e) => setNewMassage(e.target.value)}
          className="bg-zinc-700 border-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendHandler();
            }
          }}
        />
        <Button onClick={sendHandler}>{t("CHAT.SEND")}</Button>
      </div>
    </div>
  );
};

export default MessageInput;
