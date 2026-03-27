import type { User as FirebaseUser } from "firebase/auth";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";
import type {
  AuthTokenResponse,
  UserCredentialWithTokenResponse,
} from "@/types/auth";
import { auth } from "./firebase";

export type AuthUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
};

export type { AuthTokenResponse };

const toAuthUser = (firebaseUser: FirebaseUser | null): AuthUser | null => {
  if (!firebaseUser) {
    return null;
  }
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
  };
};

const mapAuthError = (error: unknown): string => {
  const code =
    error !== null &&
      typeof error === "object" &&
      "code" in error &&
      typeof (error as { code?: unknown }).code === "string"
      ? (error as { code: string }).code
      : "";

  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "E-mail ou senha incorretos.";
    case "auth/invalid-email":
      return "E-mail inválido.";
    case "auth/user-disabled":
      return "Esta conta foi desativada.";
    case "auth/too-many-requests":
      return "Muitas tentativas. Tente novamente em instantes.";
    case "auth/network-request-failed":
      return "Falha de rede. Verifique a conexão.";
    case "auth/invalid-login-credentials":
      return "E-mail ou senha incorretos.";
    default:
      return "Não foi possível entrar. Tente novamente.";
  }
};

const signIn = async (
  email: string,
  password: string
): Promise<AuthTokenResponse> => {
  const credential = await signInWithEmailAndPassword(
    auth,
    email.trim(),
    password
  );
  const tokenResponse = (credential as UserCredentialWithTokenResponse)
    ._tokenResponse;
  if (!tokenResponse) {
    throw new Error(
      "Resposta de autenticação incompleta. Atualize o app ou tente novamente."
    );
  }

  return tokenResponse;
};

const signOut = async (): Promise<void> => {
  await firebaseSignOut(auth);
};

const getCurrentUser = (): AuthUser | null => {
  return toAuthUser(auth.currentUser);
};

const observeAuthState = (
  callback: (user: AuthUser | null) => void
): (() => void) => {
  return onAuthStateChanged(auth, (u) => {
    callback(toAuthUser(u));
  });
};

export const authService = {
  signIn,
  signOut,
  getCurrentUser,
  observeAuthState,
  mapAuthError,
};
