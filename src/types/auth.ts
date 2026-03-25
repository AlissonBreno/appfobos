import type { UserCredential } from "firebase/auth";

export type AuthTokenResponse = {
  displayName: string;
  email: string;
  expiresIn: string;
  idToken: string;
  kind: string;
  localId: string;
  refreshToken: string;
  registered: boolean;
  id_users: number;
};

export type UserCredentialWithTokenResponse = UserCredential & {
  _tokenResponse?: AuthTokenResponse;
};
