import { useCallback, useRef, useState } from "react";
import { router } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

export const useLogin = () => {
  const { signIn } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submittingRef = useRef(false);

  const submit = useCallback(
    async (email: string, password: string) => {
      if (submittingRef.current) {
        return;
      }
      submittingRef.current = true;

      setError(null);
      setIsSubmitting(true);

      try {
        const result = await signIn(email.trim(), password);

        if (!result.ok) {
          setError(result.message);
          return;
        }
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
