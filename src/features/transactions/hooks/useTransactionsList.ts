import { useEffect, useMemo, useState } from "react";
import {
  getReferenceDate,
  toMonthLabel,
  toTransactionListItem
} from "@/hooks/domains/adapters";
import { useCategories, useTransactions } from "@/hooks/domains";
import { getPersistedAppUser } from "@/features/auth/authTokenStorage";
import type { TransactionListItem } from "../types/TransactionListItem";

export const useTransactionsList = () => {
  const [persistedUserId, setPersistedUserId] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadPersistedUser = async () => {
      const user = await getPersistedAppUser();

      if (!cancelled) {
        setPersistedUserId(user?.id_users ?? null);
      }
    };

    void loadPersistedUser();

    return () => {
      cancelled = true;
    };
  }, []);

  const {
    data: { transactions },
    loading: userLoading
  } = useTransactions(persistedUserId);
  const {
    data: { getById: getCategoryById }
  } = useCategories();

  return useMemo(() => {
    const referenceDate = getReferenceDate(transactions);
    const items: TransactionListItem[] = transactions.map((transaction) =>
      toTransactionListItem(
        transaction,
        getCategoryById(transaction.id_categories),
        referenceDate
      )
    );

    return {
      monthLabel: toMonthLabel(transactions),
      currency: "BRL" as const,
      items,
      userLoading
    };
  }, [getCategoryById, transactions, userLoading]);
};

