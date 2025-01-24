import { useAuthStore } from "@/zustand/useAuthStore";
import { useAuth } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { getToken } = useAuth();
  const { setToken } = useAuthStore();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const initAuth: () => Promise<void> = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = await getToken();
      setToken(token);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [getToken, setToken]);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader className="size-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthProvider;
