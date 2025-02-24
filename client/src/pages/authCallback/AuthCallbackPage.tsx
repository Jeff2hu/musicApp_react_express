import { useAuthCallback } from "@/api/user/hook";
import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { isLoaded, user } = useUser();
  const { mutate: authCallback } = useAuthCallback(() => {
    navigate("/");
  });

  useEffect(() => {
    if (!isLoaded || !user) return;

    authCallback({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
    });
  }, [isLoaded, user]);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-bleck">
      <Card className="w-[90%] max-w-md bg-zinc-900 border-zinc-800">
        <CardContent className="flex flex-col items-center gap-4 pt-6">
          <Loader className="size-8 text-emerald-500 animate-spin" />
          <p className="text-sm text-zinc-400">{t("AUTH_CALLBACK.AUTH_ING")}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthCallbackPage;
