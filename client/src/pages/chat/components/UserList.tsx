import { useGetAllUsers } from "@/api/user/hook";
import UserListSkeleton from "@/components/skeletons/UserListSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuthStore } from "@/zustand/useAuthStore";
import { useChatStore } from "@/zustand/useChatStore";
import { useSettingStore } from "@/zustand/useSettingsStore";
import { Music } from "lucide-react";
import { useTranslation } from "react-i18next";

const UserList = () => {
  const { t } = useTranslation();
  const userId = useAuthStore((state) => state.userId);
  const isMobile = useSettingStore((state) => state.isMobile);
  const { setSelectedUser, selectedUser, onlineUsers, userActivities } =
    useChatStore();
  const { data: users, isLoading: isLoadingUsers } = useGetAllUsers();

  return (
    <div className="bg-transparent md:border-r md:border-zinc-700">
      <div className="flex flex-col h-full">
        <ScrollArea className="h-[calc(100vh-280px)]">
          <div className="space-y-2 p-4">
            {isLoadingUsers || !users ? (
              <>
                {!userId && (
                  <p className="text-zinc-300/50 text-sm text-center my-2">
                    {t("SYSTEM.LOGIN_TO_SEE_MORE")}
                  </p>
                )}
                <UserListSkeleton />
              </>
            ) : (
              users?.map((user) => (
                <div
                  key={user._id}
                  onClick={() => setSelectedUser(user)}
                  className={`flex items-center justify-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedUser?._id === user._id
                      ? "bg-zinc-800"
                      : "hover:bg-zinc-800/50"
                  }`}
                >
                  <div className="relative">
                    <Avatar className="size-8 md:size-12">
                      <AvatarImage src={user.imageUrl} />
                      <AvatarFallback>{user.fullName[0]}</AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-zinc-900 ${
                        onlineUsers.has(user.clerkId)
                          ? "bg-green-500"
                          : "bg-zinc-500"
                      }`}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">{user.fullName}</p>
                  </div>

                  {isMobile && (
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {userActivities.get(user.clerkId)?.activity ===
                        "MUSIC" ? (
                          <Music className="size-3.5 text-emerald-400 shrink-0" />
                        ) : null}
                      </div>
                      {userActivities.get(user.clerkId)?.activity ===
                      "MUSIC" ? (
                        <div className="mt-1">
                          <div className="mt-1 text-sm text-white font-medium truncate">
                            {userActivities.get(user.clerkId)?.song?.title}
                          </div>
                          <div className="text-xs text-zinc-400 truncate">
                            by {userActivities.get(user.clerkId)?.song?.artist}
                          </div>
                        </div>
                      ) : onlineUsers.has(user.clerkId) ? (
                        <div className="text-zinc-500/50 text-xs">Idle</div>
                      ) : (
                        <div className="text-zinc-500/50 text-xs">Offline</div>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default UserList;
