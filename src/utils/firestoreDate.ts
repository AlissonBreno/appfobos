import { Timestamp } from "firebase/firestore";

/**
 * Converts a Firestore datetime field to an ISO string: supports `Timestamp` or non-empty string.
 * Falls back to the current instant when the value is missing or empty (e.g. required `created_at`).
 */
export const timestampOrStringToIso = (value: unknown): string => {
  if (value instanceof Timestamp) {
    return value.toDate().toISOString();
  }
  if (typeof value === "string" && value.length > 0) {
    return value;
  }
  return new Date().toISOString();
};
