import { transactionsMock } from "@/mocks/transactions";
import type { Transaction } from "@/types/transaction";
import { parseDateTime } from "@/utils/formatDate";

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

export const transactionsService = {
  getTransactions,
  getTransactionsMap,
  getTransactionById
};
