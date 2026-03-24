import { useMemo } from "react";
import { transactionsMock } from "@/mocks/transactions";
import type { MockTransaction } from "./types";

const parseDateTime = (value: string) => {
  const normalized = value.includes("T") ? value : value.replace(" ", "T");
  const parsed = Date.parse(normalized);
  return Number.isNaN(parsed) ? 0 : parsed;
};

export const useMockTransactions = (userId: number | null) => {
  return useMemo(() => {
    const transactions = transactionsMock as MockTransaction[];
    const filtered = transactions
      .filter((transaction) => !transaction.excluded)
      .filter((transaction) =>
        userId == null ? true : transaction.id_users === userId
      )
      .sort(
        (a, b) =>
          parseDateTime(b.occured_at) - parseDateTime(a.occured_at)
      );

    const byId = new Map<number, MockTransaction>(
      filtered.map((transaction) => [transaction.id_transactions, transaction])
    );

    const getById = (transactionId: number) => byId.get(transactionId) ?? null;

    return {
      transactions: filtered,
      byId,
      getById
    };
  }, [userId]);
};
