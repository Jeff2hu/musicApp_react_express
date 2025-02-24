import { checkAdminApi } from "@/api/admin/api";
import { useAlert } from "@/zustand/useAlert";
import { useChatStore } from "@/zustand/useChatStore";
import { useAuth } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { getToken, userId } = useAuth();

  const setAlertOption = useAlert((state) => state.setAlertOption);
  const initSocket = useChatStore((state) => state.initSocket);
  const disconnectSocket = useChatStore((state) => state.disconnectSocket);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        if (token) {
          await checkAdminApi(token);
        }
        if (userId) {
          initSocket(userId);
        }
      } catch (error) {
        console.error("Error in AuthProvider", error);
        setAlertOption({
          open: true,
          title: "Error in AuthProvider",
          description: "Error in AuthProvider",
        });
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    return () => disconnectSocket();
  }, [getToken, userId]);

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader className="size-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthProvider;
