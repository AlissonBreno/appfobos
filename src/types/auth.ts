import type { UserCredential } from "firebase/auth";

/** Shape of Identity Toolkit verify password payload (runtime: `UserCredential._tokenResponse`). */
export type AuthTokenResponse = {
  displayName: string;
  email: string;
  expiresIn: string;
  idToken: string;
  kind: string;
  localId: string;
  refreshToken: string;
  registered: boolean;
};

export type UserCredentialWithTokenResponse = UserCredential & {
  _tokenResponse?: AuthTokenResponse;
};
