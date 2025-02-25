import { useGetUserMessages } from "@/api/user/hook";
import TopBar from "@/components/TopBar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/zustand/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import ChatHeader from "./components/ChatHeader";
import MessageInput from "./components/MessageInput";
import UserList from "./components/UserList";

const ChatPage = () => {
  const { user } = useUser();
  const { selectedUser, messages } = useChatStore();

  const { isLoading: isLoadingMessages } = useGetUserMessages(
    selectedUser?.clerkId || ""
  );

  return (
    <main className="h-full rounded-lg bg-gradient-to-b from-black to-zinc-800 overflow-hidden">
      <TopBar />

      <div className="grid grid-cols-[80px_1fr] lg:grid-cols-[300px_1fr] h-[calc(100vh-180px)]">
        <UserList />

        <div className="flex flex-col h-full">
          {selectedUser ? (
            <>
              <ChatHeader />

              <ScrollArea className="h-[calc(100vh-340px)]">
                <div className="p-4 space-y-4">
                  {isLoadingMessages ? (
                    <Loader2 className="size-6 animate-spin" />
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message._id}
                        className={`flex items-center gap-3 ${
                          message.senderId === user!.id
                            ? "flex-row-reverse"
                            : ""
                        }`}
                      >
                        <Avatar className="size-8">
                          <AvatarImage
                            src={
                              message.senderId === user!.id
                                ? user!.imageUrl
                                : selectedUser.imageUrl
                            }
                          />
                        </Avatar>

                        <div
                          className={`rounded-lg p-3 max-w-[70%] ${
                            message.senderId === user?.id
                              ? "bg-green-500"
                              : "bg-zinc-800"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <span className="text-xs text-zinc-300 mt-1 block">
                            {format(message.createdAt, "MMM d, yyyy h:mm a")}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>

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
  return (
    <div className="flex flex-col items-center justify-center h-full sapce-y-6">
      <img src="/logo.png" alt="logo" className="size-20 animate-bounce" />

      <div className="text-center">
        <h3 className="text-lg font-bold text-zinc-300 mb-1">
          No Conversation Selected
        </h3>
        <p className="text-zinc-500 text-sm">
          Select a conversation or start a new one
        </p>
      </div>
    </div>
  );
};
