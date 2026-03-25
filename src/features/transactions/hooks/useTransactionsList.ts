import { useMemo } from "react";
import {
  getReferenceDate,
  toMonthLabel,
  toTransactionListItem
} from "@/hooks/domains/adapters";
import {
  useCategories,
  useTransactions,
  useUser
} from "@/hooks/domains";
import type { TransactionListItem } from "../types/TransactionListItem";

export const useTransactionsList = () => {
  const {
    data: { activeUserId },
    loading: userLoading
  } = useUser();
  const {
    data: { transactions }
  } = useTransactions(activeUserId);
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

