import { transactionsMock } from "@/mocks/transactions";
import type {
  Transaction,
  CreateTransactionInput,
  ExcludeTransactionInput,
  UpdateTransactionInput
} from "@/types/transaction";
import { parseDateTime, toDateTime, toIsoDate, toSqlDateTimeNow } from "@/utils/formatDate";

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

const getTransactions = (userId: number | null = null): Transaction[] => {
  const transactions = transactionsMock as Transaction[];
  return transactions
    .filter((transaction) => !transaction.excluded)
    .filter((transaction) => (userId == null ? true : transaction.id_users === userId))
    .sort(
      (a, b) => parseDateTime(b.occured_at).getTime() - parseDateTime(a.occured_at).getTime()
    );
};

const getTransactionsMap = (userId: number | null = null): Map<number, Transaction> => {
  return new Map(
    getTransactions(userId).map((transaction) => [transaction.id_transactions, transaction])
  );
};

const getTransactionById = (
  transactionId: number,
  userId: number | null = null
): Transaction | null => {
  return getTransactionsMap(userId).get(transactionId) ?? null;
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
