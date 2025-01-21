import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HomeIcon, LibraryIcon, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const LeftSideBar = () => {
  return (
    <div className="h-full flex flex-col gap-2">
      {/* Navigation Menu */}
      <div className="bg-zinc-900 rounded-lg p-4">
        <div className="space-y-2">
          <Link
            to={"/"}
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "w-full justify-start text-white hover:bg-zinc-800",
              })
            )}
          >
            <HomeIcon className="mr-2 size-5" />
            <span className="hidden md:inline">Home</span>
          </Link>

          <Link
            to={"/chat"}
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "w-full justify-start text-white hover:bg-zinc-800",
              })
            )}
          >
            <MessageCircle className="mr-2 size-5" />
            <span className="hidden md:inline">Messages</span>
          </Link>
        </div>
      </div>

      {/* Library Menu */}
      <div className="flex-1 rounded-lg p-4 bg-zinc-900">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-white p-2">
            <LibraryIcon className="mr-2 size-5" />
            <span className="hidden md:inline">Playlists</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
