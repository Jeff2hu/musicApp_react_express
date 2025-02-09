import { useGetAllUsers } from "@/api/user/hook";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Music, Users } from "lucide-react";

const FriendsActivity = () => {
  const { data: users, isLoading } = useGetAllUsers();

  const isPlaying = true;

  return (
    <div className="h-[calc(100vh-120px)] bg-zinc-900 rounded-lg flex flex-col">
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
              <div className="flex items-start gap-3">
                <div className="relative">
                  <Avatar className="size-10 border border-zinc-800">
                    <AvatarImage src={user.imageUrl} alt="user-image" />
                    <AvatarFallback>{user.fullName[0]}</AvatarFallback>
                  </Avatar>

                  <div
                    className="absolute bottom-0 right-0 size-3 rounded-full border-2 bprder-zinc-900 bg-zinc-300"
                    aria-hidden
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-white">
                      {user.fullName.split("")[0]} ...
                    </span>
                    {isPlaying && (
                      <Music className="size-3.5 text-emerald-400 shrink-0" />
                    )}
                  </div>
                  {isPlaying ? (
                    <div className="mt-1">
                      <div className="mt-1 text-sm text-white font-medium truncate">
                        Cardigan
                      </div>
                      <div className="text-xs text-zinc-400 truncate">
                        by Talyer Swift
                      </div>
                    </div>
                  ) : (
                    <div className="mt-1 text-zinc-400">Idle</div>
                  )}
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
