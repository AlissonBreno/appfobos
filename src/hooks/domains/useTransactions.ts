import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore
} from "react";
import {
  getTransactionsRevision,
  subscribeTransactionsChanged,
  transactionsService
} from "@/services";
import type { Transaction } from "../../types/transaction";

export const useTransactions = (userId: number | null) => {
  const revision = useSyncExternalStore(
    subscribeTransactionsChanged,
    getTransactionsRevision,
    getTransactionsRevision
  );

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const list = await transactionsService.getTransactions(userId);

        if (!cancelled) {
          setTransactions(list);
        }
      } catch (e) {
        if (!cancelled) {
          setTransactions([]);
          setError(
            e instanceof Error ? e : new Error("Failed to load transactions")
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [userId, revision]);

  const byId = useMemo(
    () =>
      new Map(
        transactions.map((transaction) => [
          transaction.id_transactions,
          transaction
        ])
      ),
    [transactions]
  );

  const getById = useCallback(
    (transactionId: number) => byId.get(transactionId) ?? null,
    [byId]
  );

  return {
    data: {
      transactions,
      byId,
      getById
    },
    loading,
    error
  };
};
