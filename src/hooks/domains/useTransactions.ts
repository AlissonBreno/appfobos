import { useMemo } from "react";
import { transactionsService } from "@/services";
import type { Transaction } from "../../types/transaction";

export const useTransactions = (userId: number | null) => {
  return useMemo(() => {
    try {
      const transactions = transactionsService.getTransactions(userId) as Transaction[];
      const byId = transactionsService.getTransactionsMap(userId);
      const getById = (transactionId: number) => byId.get(transactionId) ?? null;

      return {
        data: {
          transactions,
          byId,
          getById
        },
        loading: false,
        error: null as Error | null
      };
    } catch (error) {
      const byId = new Map<number, Transaction>();
      const getById = () => null;

      return {
        data: {
          transactions: [] as Transaction[],
          byId,
          getById
        },
        loading: false,
        error: error instanceof Error ? error : new Error("Failed to load transactions")
      };
    }
  }, [userId]);
};
