import AsyncStorage from "@react-native-async-storage/async-storage";
import type { AuthTokenResponse } from "@/types/auth";

const AUTH_TOKEN_RESPONSE_KEY = "@appfobos/auth/tokenResponse";

export const persistAuthTokenResponse = async (
  data: AuthTokenResponse
): Promise<void> => {
  await AsyncStorage.setItem(AUTH_TOKEN_RESPONSE_KEY, JSON.stringify(data));
};

export const clearPersistedAuthTokenResponse = async (): Promise<void> => {
  await AsyncStorage.removeItem(AUTH_TOKEN_RESPONSE_KEY);
};

export const getPersistedAuthTokenResponse =
  async (): Promise<AuthTokenResponse | null> => {
    try {
      const raw = await AsyncStorage.getItem(AUTH_TOKEN_RESPONSE_KEY);
      if (raw == null || raw === "") {
        return null;
      }
      const parsed: unknown = JSON.parse(raw);
      if (
        typeof parsed !== "object" ||
        parsed === null ||
        typeof (parsed as AuthTokenResponse).email !== "string"
      ) {
        return null;
      }
      const email = (parsed as AuthTokenResponse).email.trim();
      if (email === "") {
        return null;
      }
      return parsed as AuthTokenResponse;
    } catch {
      return null;
    }
  };
