import { checkAdminApi } from "@/api/admin/api";
import { useAlert } from "@/zustand/useAlert";
import { useToken } from "@/zustand/useToken";
import { useAuth } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { getToken } = useAuth();

  const { setToken } = useToken();
  const { setAlertOption } = useAlert();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        if (token) {
          setToken(token);
          await checkAdminApi();
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
  }, [getToken]);

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
