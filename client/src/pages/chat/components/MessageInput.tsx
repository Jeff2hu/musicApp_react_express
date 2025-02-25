import { Input } from "@/components/ui/input";
import { useChatStore } from "@/zustand/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";

const MessageInput = () => {
  const { user } = useUser();
  const { selectedUser, sendMessage } = useChatStore();
  const [newMessage, setNewMassage] = useState("");

  const sendHandler = () => {
    if (!selectedUser || !user) return;
    sendMessage(user.id, selectedUser.clerkId, newMessage);
    setNewMassage("");
  };

  return (
    <div className="p-4 mt-auto border-t border-zinc-600">
      <div className="flex gap-2">
        <Input
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMassage(e.target.value)}
          className="bg-zinc-700 border-none"
          onKeyDown={(e) => e.key === "Enter" && sendHandler()}
        />
      </div>
    </div>
  );
};

export default MessageInput;
