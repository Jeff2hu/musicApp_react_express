import { useGetAllUsers } from "@/api/user/hook";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users } from "lucide-react";

const FriendsActivity = () => {
  const { data: users, isLoading } = useGetAllUsers();

  return (
    <div className="h-full bg-zinc-900 rounded-lg flex flex-col">
      <div className="flex justify-between items-center p-4 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Users className="size-5 shrink-0" />
          <h2 className="font-semibold">What they're listening to</h2>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {users?.map((user) => (
            <div
              key={user._id}
              className="cursor-pointer hover:bg-zinc-800/50 rounded-md p-3 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="size-10 border border-zinc-800">
                    <AvatarImage src={user.imageUrl} alt={user.fullName} />
                    <AvatarFallback className="bg-zinc-800 text-zinc-400">
                      {user.fullName[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default FriendsActivity;
