import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChatStore } from "@/zustand/useChatStore";
import { useSettingStore } from "@/zustand/useSettingsStore";
import { useTranslation } from "react-i18next";
import MobileFriend from "./MobileFriend";

const ChatHeader = () => {
  const { t } = useTranslation();
  const isMobile = useSettingStore((state) => state.isMobile);
  const { selectedUser, onlineUsers } = useChatStore();

  if (!selectedUser) return null;

  return (
    <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={selectedUser.imageUrl} />
          <AvatarFallback>{selectedUser.fullName[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-medium">{selectedUser.fullName}</h2>
          <p className="text-sm text-zinc-400">
            {onlineUsers.has(selectedUser.clerkId)
              ? t("CHAT.ONLINE")
              : t("CHAT.OFFLINE")}
          </p>
        </div>
      </div>

      {isMobile && <MobileFriend />}
    </div>
  );
};

export default ChatHeader;
