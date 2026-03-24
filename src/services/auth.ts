import * as Crypto from "expo-crypto";
import type { User } from "@/types/user";
import { usersService } from "./users";

const authenticateUser = async (login: string, passwordPlain: string): Promise<User | null> => {
  const user = usersService.getUserByLogin(login);
  if (!user) {
    return null;
  }

  const digest = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.MD5,
    passwordPlain,
    { encoding: Crypto.CryptoEncoding.HEX }
  );

  if (digest.toLowerCase() !== user.password.toLowerCase()) {
    return null;
  }

  return user;
};

const signOut = async (): Promise<void> => {
  // Reservado para limpar tokens / storage quando houver backend ou persistência local.
};

export const authService = {
  authenticateUser,
  signOut
};
