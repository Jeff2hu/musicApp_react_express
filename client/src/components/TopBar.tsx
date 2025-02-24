import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/zustand/useAuthStore";
import { SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon, ShieldAlertIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import HeaderIcon from "./HeaderIcon";
import SignInOAuthButton from "./SignInOAuthButton";
import { buttonVariants } from "./ui/button";

const TopBar = () => {
  const { t } = useTranslation();
  const isAdmin = useAuthStore((state) => state.isAdmin);

  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-gradient-to-l from-zinc-950 to-black backdrop-blur-md z-10">
      <HeaderIcon isIcon />

      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center gap-2">
          {!isAdmin && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="bg-yellow-500/50 rounded-full p-2">
                    <ShieldAlertIcon className="size-4" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">{t("TOP_BAR.ADMIN_TOOLTIP")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <Link
            to={"/admin"}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <LayoutDashboardIcon className="size-4 mr-2" />
            {t("TOP_BAR.ADMIN_DASHBOARD")}
          </Link>
        </div>

        <SignedOut>
          <SignInOAuthButton />
        </SignedOut>

        <UserButton />
      </div>
    </div>
  );
};

export default TopBar;
