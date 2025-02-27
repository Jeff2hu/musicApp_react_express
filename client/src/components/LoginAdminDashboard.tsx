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
import SignInOAuthButton from "./SignInOAuthButton";
import { buttonVariants } from "./ui/button";

const LoginAdminDashboard = () => {
  const { t } = useTranslation();
  const userId = useAuthStore((state) => state.userId);
  const isAdmin = useAuthStore((state) => state.isAdmin);

  return (
    <div
      className={cn(
        "flex items-center gap-4 z-50 flex-col md:flex-row",
        userId && "flex-row"
      )}
    >
      <div className="flex items-center gap-2">
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
  );
};

export default LoginAdminDashboard;
