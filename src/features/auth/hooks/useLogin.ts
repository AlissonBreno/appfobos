import { useCallback, useRef, useState } from "react";
import { router } from "expo-router";
import { useAuth } from "@/features/auth/context/AuthContext";
import { authService } from "@/services";

export const useLogin = () => {
  const { signIn } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submittingRef = useRef(false);

  const submit = useCallback(
    async (login: string, password: string) => {
      if (submittingRef.current) {
        return;
      }
      submittingRef.current = true;

      setError(null);
      setIsSubmitting(true);

      try {
        const user = await authService.authenticateUser(login.trim(), password);
        if (!user) {
          setError("Login ou senha inválidos.");
          return;
        }
        signIn(user.id_users);
        router.replace("/(tabs)");
      } catch {
        setError("Não foi possível entrar. Tente novamente.");
      } finally {
        submittingRef.current = false;
        setIsSubmitting(false);
      }
    },
    [signIn]
  );

  return { submit, error, isSubmitting };
};
