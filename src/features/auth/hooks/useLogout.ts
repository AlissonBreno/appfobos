import { useCallback, useRef, useState } from "react";
import { router } from "expo-router";
import { useAuth } from "@/features/auth/context/AuthContext";
import { authService } from "@/services";

export const useLogout = () => {
  const { signOut } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const loggingOutRef = useRef(false);

  const logout = useCallback(async () => {
    if (loggingOutRef.current) {
      return;
    }
    loggingOutRef.current = true;
    setIsLoggingOut(true);

    try {
      await authService.signOut();
      signOut();
      router.replace("/login");
    } finally {
      loggingOutRef.current = false;
      setIsLoggingOut(false);
    }
  }, [signOut]);

  return { logout, isLoggingOut };
};
