import { useGetUserMessages } from "@/api/user/hook";
import ChatSkeleton from "@/components/skeletons/ChatSkeleton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Message } from "@/type/message";
import { useChatStore } from "@/zustand/useChatStore";
import { useSettingStore } from "@/zustand/useSettingsStore";
import { useUser } from "@clerk/clerk-react";
import { format } from "date-fns";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { VariableSizeList } from "react-window";
import ChatHeader from "./components/ChatHeader";
import MessageInput from "./components/MessageInput";
import MobileFriend from "./components/MobileFriend";
import UserList from "./components/UserList";

const ChatPage = () => {
  const { user } = useUser();
  const isMobile = useSettingStore((state) => state.isMobile);
  const { selectedUser, messages } = useChatStore();

  const { isLoading: isLoadingMessages } = useGetUserMessages(
    selectedUser?.clerkId || ""
  );

  const listRef = useRef<VariableSizeList<Message>>(null);
  const sizeMap = useRef<{ [key: string]: number }>({});
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 0 && selectedUser && listRef.current) {
      listRef.current.scrollToItem(messages.length - 1, "end");
    }
  }, [messages, selectedUser]);

  const getSize = (index: number) => {
    return sizeMap.current[index] || 50;
  };

  const MessageRow = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const message = messages[index];
    const isDifferentDay =
      index > 0 &&
      format(message.createdAt, "yyyy-MM-dd") !==
        format(messages[index - 1]?.createdAt, "yyyy-MM-dd");

    const setSize = (element: HTMLDivElement | null) => {
      if (element) {
        const height = element.getBoundingClientRect().height + 20;
        if (sizeMap.current[index] !== height) {
          sizeMap.current[index] = height;
          if (listRef.current) {
            listRef.current.resetAfterIndex(0);
          }
        }
      }
    };

    return (
      <div style={{ ...style, height: "auto" }} ref={setSize}>
        {isDifferentDay && (
          <div className="flex items-center gap-3 justify-center my-2">
            <span className="text-xs text-zinc-300 block">
              {format(message.createdAt, "MM/dd")}
            </span>
          </div>
        )}
        <div
          className={`flex items-start gap-2 ${
            message.senderId === user!.id ? "flex-row-reverse" : ""
          }`}
        >
          <Avatar className="size-8 mt-1">
            <AvatarImage
              src={
                message.senderId === user!.id
                  ? user!.imageUrl
                  : selectedUser!.imageUrl
              }
            />
          </Avatar>
          <div
            className={`flex flex-col w-full ${
              message.senderId === user?.id ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`rounded-lg p-3 max-w-[45%] break-words whitespace-pre-wrap ${
                message.senderId === user?.id ? "bg-green-500" : "bg-zinc-800"
              }`}
            >
              <p className="text-sm leading-normal">{message.content}</p>
            </div>
            <span className="text-xs text-zinc-300 mt-1 block">
              {format(message.createdAt, "HH:mm")}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="h-full rounded-lg bg-gradient-to-b from-black to-zinc-800 overflow-hidden">
      <div className="grid md:grid-cols-[250px_1fr] h-[calc(100vh-180px)]">
        {!isMobile && <UserList />}

        <div className="flex flex-col h-full">
          {selectedUser ? (
            <>
              <ChatHeader />

              <div className="space-y-2 p-2" ref={scrollRef}>
                {isLoadingMessages ? (
                  <ChatSkeleton />
                ) : (
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-expect-error
                  <VariableSizeList
                    ref={listRef}
                    width="100%"
                    height={window.innerHeight - 340}
                    itemCount={messages.length}
                    overscanCount={2}
                    style={{ scrollbarWidth: "none" }}
                    itemSize={getSize}
                  >
                    {MessageRow}
                  </VariableSizeList>
                )}
              </div>

              <MessageInput />
            </>
          ) : (
            <NoConversationSelected />
          )}
        </div>
      </div>
    </main>
  );
};

export default ChatPage;

const NoConversationSelected = () => {
  const { t } = useTranslation();
  const isMobile = useSettingStore((state) => state.isMobile);

  return (
    <div className="flex flex-col items-center justify-center h-full sapce-y-6 relative">
      {isMobile && (
        <div className="absolute top-0 right-0">
          <MobileFriend />
        </div>
      )}
      <img src="/logo.png" alt="logo" className="size-20 animate-bounce" />

      <div className="text-center">
        <h3 className="text-lg font-bold text-zinc-300 mb-1">
          {t("CHAT.NO_CONVERSATION_SELECTED")}
        </h3>
        <p className="text-zinc-500 text-sm">
          {t("CHAT.SELECT_A_CONVERSATION_OR_START_A_NEW_ONE")}
        </p>
      </div>
    </div>
  );
};
