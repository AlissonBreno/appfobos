import {
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { transactionsMock } from "@/mocks/transactions";
import type {
  Transaction,
  CreateTransactionInput,
  ExcludeTransactionInput,
  UpdateTransactionInput
} from "@/types/transaction";
import { parseDateTime, toDateTime, toIsoDate, toSqlDateTimeNow } from "@/utils/formatDate";
import { db } from "./firebase";

const TRANSACTIONS_COLLECTION = "transactions";

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

const toTransactionDateString = (value: unknown): string => {
  if (value instanceof Timestamp) {
    return value.toDate().toISOString();
  }
  if (typeof value === "string") {
    return value;
  }
  return "";
};

const toFiniteNumber = (value: unknown, fallback: number): number => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }
  return fallback;
};

const parseIdField = (
  rawValue: unknown,
  docId: string,
  fallbackFromDoc: boolean
): number => {
  let id: number;
  if (typeof rawValue === "number" && Number.isFinite(rawValue)) {
    id = rawValue;
  } else if (typeof rawValue === "string") {
    const parsed = Number(rawValue);
    id = Number.isFinite(parsed) ? parsed : NaN;
  } else {
    id = NaN;
  }
  if (!Number.isFinite(id) && fallbackFromDoc) {
    const fromDocId = Number(docId);
    id = Number.isFinite(fromDocId) ? fromDocId : 0;
  }
  return Number.isFinite(id) ? id : 0;
};

const mapDocumentToTransaction = (
  docId: string,
  raw: Record<string, unknown>
): Transaction => {
  const id_transactions = parseIdField(raw.id_transactions, docId, true);
  const id_users = parseIdField(raw.id_users, docId, false);
  const id_categories = parseIdField(raw.id_categories, docId, false);

  return {
    id_transactions,
    id_users,
    id_categories,
    amount: toFiniteNumber(raw.amount, 0),
    description: typeof raw.description === "string" ? raw.description : "",
    occured_at: toTransactionDateString(raw.occured_at),
    notes: typeof raw.notes === "string" ? raw.notes : "",
    excluded: raw.excluded === true,
    attachment_count: toFiniteNumber(raw.attachment_count, 0),
    created_at: toTransactionDateString(raw.created_at),
    updated_at: toUpdatedAt(raw.updated_at),
  };
};

const fetchTransactionsForUserFromFirestore = async (
  userId: number
): Promise<Transaction[]> => {
  const snapshot = await getDocs(
    query(
      collection(db, TRANSACTIONS_COLLECTION),
      where("id_users", "==", userId)
    )
  );
  const transactions = snapshot.docs.map((doc) =>
    mapDocumentToTransaction(doc.id, doc.data() as Record<string, unknown>)
  );
  return transactions
    .filter((transaction) => !transaction.excluded)
    .sort(
      (a, b) =>
        parseDateTime(b.occured_at).getTime() -
        parseDateTime(a.occured_at).getTime()
    );
};

type TransactionsListener = () => void;

const transactionsListeners = new Set<TransactionsListener>();
let transactionsRevision = 0;

export const subscribeTransactionsChanged = (
  listener: TransactionsListener
): (() => void) => {
  transactionsListeners.add(listener);
  return () => {
    transactionsListeners.delete(listener);
  };
};

export const getTransactionsRevision = (): number => transactionsRevision;

const notifyTransactionsChanged = (): void => {
  transactionsRevision += 1;
  const listenersSnapshot = [...transactionsListeners];
  queueMicrotask(() => {
    listenersSnapshot.forEach((listener) => listener());
  });
};

const getTransactions = async (
  userId: number | null = null
): Promise<Transaction[]> => {
  if (userId === null) {
    return [];
  }
  return fetchTransactionsForUserFromFirestore(userId);
};

const getTransactionsMap = async (
  userId: number | null = null
): Promise<Map<number, Transaction>> => {
  const list = await getTransactions(userId);
  return new Map(
    list.map((transaction) => [transaction.id_transactions, transaction])
  );
};

const getTransactionById = async (
  transactionId: number,
  userId: number | null = null
): Promise<Transaction | null> => {
  const map = await getTransactionsMap(userId);
  return map.get(transactionId) ?? null;
};


const getNextTransactionId = (): number => {
  const highestId = transactionsMock.reduce((accumulator, transaction) => {
    return Math.max(accumulator, transaction.id_transactions);
  }, 0);

  return highestId + 1;
};

const createTransaction = (input: CreateTransactionInput): Transaction => {
  const isoDate = toIsoDate(input.occured_at);
  const occurredAt = toDateTime(isoDate);
  const nextId = getNextTransactionId();

  const createdTransaction: Transaction = {
    id_transactions: nextId,
    id_users: input.userId,
    id_categories: input.categoryId,
    amount: input.amount,
    description: input.description.trim(),
    occured_at: occurredAt,
    notes: input.notes.trim(),
    excluded: false,
    attachment_count: input.attachmentsCount,
    created_at: occurredAt,
    updated_at: null
  };

  transactionsMock.push(createdTransaction);
  notifyTransactionsChanged();

  return createdTransaction;
};

const updateTransaction = (input: UpdateTransactionInput): Transaction => {
  const index = transactionsMock.findIndex(
    (transaction) =>
      transaction.id_transactions === input.transactionId &&
      transaction.id_users === input.userId
  );

  if (index === -1) {
    throw new Error("Transação não encontrada para atualização");
  }

  const isoDate = toIsoDate(input.occured_at);
  const occurredAt = toDateTime(isoDate);

  const existing = transactionsMock[index];
  const updated: Transaction = {
    ...existing,
    id_categories: input.categoryId,
    amount: input.amount,
    description: input.description.trim(),
    occured_at: occurredAt,
    notes: input.notes.trim(),
    attachment_count: input.attachmentsCount,
    updated_at: toSqlDateTimeNow()
  };

  transactionsMock[index] = updated;
  notifyTransactionsChanged();

  return updated;
};

const applyAttachmentCount = (
  transactionId: number,
  userId: number,
  count: number
): void => {
  const index = transactionsMock.findIndex(
    (transaction) =>
      transaction.id_transactions === transactionId && transaction.id_users === userId
  );

  if (index === -1) {
    return;
  }

  const existing = transactionsMock[index];
  transactionsMock[index] = {
    ...existing,
    attachment_count: count,
    updated_at: toSqlDateTimeNow()
  };
  notifyTransactionsChanged();
};

const excludeTransaction = (input: ExcludeTransactionInput): void => {
  const index = transactionsMock.findIndex(
    (transaction) =>
      transaction.id_transactions === input.transactionId &&
      transaction.id_users === input.userId
  );

  if (index === -1) {
    throw new Error("Transação não encontrada para exclusão");
  }

  const existing = transactionsMock[index];
  if (existing.excluded) {
    return;
  }

  transactionsMock[index] = {
    ...existing,
    excluded: true,
    updated_at: toSqlDateTimeNow()
  };
  notifyTransactionsChanged();
};

export const transactionsService = {
  getTransactions,
  getTransactionsMap,
  getTransactionById,
  createTransaction,
  updateTransaction,
  applyAttachmentCount,
  excludeTransaction
};
