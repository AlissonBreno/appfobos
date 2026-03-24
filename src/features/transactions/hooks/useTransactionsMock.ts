import { useMemo } from "react";
import {
  getReferenceDate,
  toDashboardChart,
  toMonthLabel,
  toTransactionListItem
} from "@/hooks/domains/adapters";
import {
  useCategories,
  useTransactions,
  useUser
} from "@/hooks/domains";
import type { TransactionListItem } from "../types/TransactionListItem";

export const useTransactionsMock = () => {
  const {
    data: { activeUserId }
  } = useUser();
  const {
    data: { transactions }
  } = useTransactions(activeUserId);
  const {
    data: { getById: getCategoryById, byId: categoriesById }
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
      chart: toDashboardChart(transactions, categoriesById),
      currency: "BRL" as const,
      items
    };
  }, [categoriesById, getCategoryById, transactions]);
};

