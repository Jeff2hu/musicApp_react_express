import { useGetAllUsers } from "@/api/user/hook";
import UserListSkeleton from "@/components/skeletons/UserListSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/zustand/useChatStore";
import { Music, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

const FriendsActivity = () => {
  const { t } = useTranslation();

  const userActivities = useChatStore((state) => state.userActivities);
  const onlineUsers = useChatStore((state) => state.onlineUsers);
  const { data: users, isLoading } = useGetAllUsers();

  return (
    <div className="h-full bg-zinc-900 rounded-lg flex flex-col">
      <div className="flex justify-between items-center p-4 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Users className="size-5 shrink-0" />
          <h2 className="font-semibold">{t("FRIENDS_ACTIVITY.TITLE")}</h2>
        </div>
      </div>

      <ScrollArea className="flex-1">
        {isLoading || !users || users?.length === 0 ? (
          <UserListSkeleton />
        ) : (
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
                      className={`absolute bottom-0 right-0 size-3 rounded-full border-2 border-zinc-900 ${
                        onlineUsers.has(user.clerkId)
                          ? "bg-emerald-400"
                          : "bg-zinc-300"
                      }`}
                      aria-hidden
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-white">
                        {user.fullName}
                      </span>
                      {userActivities.get(user.clerkId)?.activity ===
                      "MUSIC" ? (
                        <Music className="size-3.5 text-emerald-400 shrink-0" />
                      ) : null}
                    </div>
                    {userActivities.get(user.clerkId)?.activity === "MUSIC" ? (
                      <div className="mt-1">
                        <div className="mt-1 text-sm text-white font-medium truncate">
                          {userActivities.get(user.clerkId)?.song?.title}
                        </div>
                        <div className="text-xs text-zinc-400 truncate">
                          by {userActivities.get(user.clerkId)?.song?.artist}
                        </div>
                      </div>
                    ) : onlineUsers.has(user.clerkId) ? (
                      <div className="text-zinc-500/80 text-sm">Idle</div>
                    ) : (
                      <div className="text-zinc-500/50 text-sm">Offline</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default FriendsActivity;
