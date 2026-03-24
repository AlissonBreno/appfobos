import { transactionsMock } from "@/mocks/transactions";
import type { Transaction, CreateTransactionInput } from "@/types/transaction";
import { parseDateTime, toDateTime, toIsoDate } from "@/utils/formatDate";

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
  transactionsListeners.forEach((listener) => listener());
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

export const transactionsService = {
  getTransactions,
  getTransactionsMap,
  getTransactionById,
  createTransaction
};
