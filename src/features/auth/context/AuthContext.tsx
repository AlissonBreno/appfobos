import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  clearPersistedAuthTokenResponse,
  persistAuthTokenResponse,
} from "@/features/auth/authTokenStorage";
import { authService, type AuthUser } from "@/services/authService";
import type { AuthTokenResponse } from "@/types/auth";

export type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  signIn: (
    email: string,
    password: string
  ) => Promise<
    | { ok: true; tokenResponse: AuthTokenResponse }
    | { ok: false; message: string }
  >;
  signOut: () => Promise<void>;
};

export const AuthStateContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = authService.observeAuthState((nextUser) => {
      setUser(nextUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    setError(null);
    try {
      const tokenResponse = await authService.signIn(email, password);
      
      //TODO se necessário persistir também o db.users aqui também
      await persistAuthTokenResponse(tokenResponse);
      return { ok: true as const, tokenResponse };
    } catch (err) {
      const message = authService.mapAuthError(err);
      setError(message);
      return { ok: false as const, message };
    }
  }, []);

  const signOut = useCallback(async () => {
    setError(null);
    await clearPersistedAuthTokenResponse();
    await authService.signOut();
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: user !== null,
      loading,
      error,
      signIn,
      signOut,
    }),
    [user, loading, error, signIn, signOut]
  );

  return (
    <AuthStateContext.Provider value={value}>{children}</AuthStateContext.Provider>
  );
};
