import { useContext } from "react";
import {
  AuthStateContext,
  type AuthContextValue,
} from "@/features/auth/context/AuthContext";

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthStateContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};
