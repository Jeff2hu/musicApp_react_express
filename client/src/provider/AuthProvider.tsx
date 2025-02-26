import { checkAdminApi } from "@/api/admin/api";
import { setClerkGetToken } from "@/lib/axios";
import { useAlert } from "@/zustand/useAlert";
import { useAuthStore } from "@/zustand/useAuthStore";
import { useChatStore } from "@/zustand/useChatStore";
import { useAuth } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { getToken, userId: clerkId } = useAuth();

  const setAlertOption = useAlert((state) => state.setAlertOption);
  const initSocket = useChatStore((state) => state.initSocket);
  const disconnectSocket = useChatStore((state) => state.disconnectSocket);

  const setUserId = useAuthStore((state) => state.setUserId);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 設置 getToken 函數供 axios interceptor 使用
    setClerkGetToken(getToken);

    const initAuth = async () => {
      try {
        const token = await getToken();
        if (token) {
          await checkAdminApi(token);
        }
        if (clerkId) {
          setUserId(clerkId);
          initSocket(clerkId);
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
  }, [getToken, clerkId]);

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
