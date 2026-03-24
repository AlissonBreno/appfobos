import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

type AuthContextValue = {
  userId: number | null;
  signIn: (id: number) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userId, setUserId] = useState<number | null>(null);

  const signIn = useCallback((id: number) => {
    setUserId(id);
  }, []);

  const signOut = useCallback(() => {
    setUserId(null);
  }, []);

  const value = useMemo(
    () => ({
      userId,
      signIn,
      signOut
    }),
    [userId, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};
