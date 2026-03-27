import {
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { getPersistedAuthTokenResponse } from "@/features/auth/authTokenStorage";
import type { User } from "@/types/user";
import { timestampOrStringToIso } from "@/utils/firestoreDate";
import { db } from "./firebase";

const USERS_COLLECTION = "users";

const toUpdatedAt = (value: unknown): string | null => {
  if (value == null || value === "") {
    return null;
  }
  if (value instanceof Timestamp) {
    return value.toDate().toISOString();
  }
  if (typeof value === "string") {
    return value;
  }
  return null;
};

const mapDocumentToUser = (docId: string, raw: Record<string, unknown>): User => {
  const idUsersRaw = raw.id_users;
  let id_users: number;
  if (typeof idUsersRaw === "number" && Number.isFinite(idUsersRaw)) {
    id_users = idUsersRaw;
  } else if (typeof idUsersRaw === "string") {
    const parsed = Number(idUsersRaw);
    id_users = Number.isFinite(parsed) ? parsed : NaN;
  } else {
    id_users = NaN;
  }
  if (!Number.isFinite(id_users)) {
    const fromDocId = Number(docId);
    id_users = Number.isFinite(fromDocId) ? fromDocId : 0;
  }

  const name = typeof raw.name === "string" ? raw.name : "";
  const login = typeof raw.login === "string" ? raw.login : "";
  const budgetRaw = raw.budget;
  const budget =
    typeof budgetRaw === "number"
      ? budgetRaw
      : typeof budgetRaw === "string"
        ? Number(budgetRaw)
        : 0;

  return {
    id_users,
    name,
    login,
    password: "",
    budget: Number.isFinite(budget) ? budget : 0,
    created_at: timestampOrStringToIso(raw.created_at),
    updated_at: toUpdatedAt(raw.updated_at),
  };
};

const normalizeLoginForQuery = (login: string): string =>
  login.trim().toLowerCase();

const getUserByFirestoreLogin = async (
  login: string
): Promise<User | null> => {
  const normalizedLogin = normalizeLoginForQuery(login);
  if (normalizedLogin === "") {
    return null;
  }

  const usersQuery = query(
    collection(db, USERS_COLLECTION),
    where("login", "==", normalizedLogin)
  );
  const snapshot = await getDocs(usersQuery);

  if (snapshot.empty) {
    return null;
  }

  const first = snapshot.docs[0];
  return mapDocumentToUser(first.id, first.data() as Record<string, unknown>);
};

type GetAppUserFromPersistedTokenOptions = {
  fallbackLogin?: string | null;
};

const getAppUserFromPersistedToken = async (
  options?: GetAppUserFromPersistedTokenOptions
): Promise<User | null> => {
  const persisted = await getPersistedAuthTokenResponse();
  const fromStorage = persisted?.email?.trim() ?? "";
  const fallback = options?.fallbackLogin?.trim() ?? "";
  const login = fromStorage || fallback;
  if (!login) {
    return null;
  }
  return getUserByFirestoreLogin(login);
};

export const usersService = {
  getUserByFirestoreLogin,
  getAppUserFromPersistedToken,
};
