import { useMemo } from "react";
import {
  getReferenceDate,
  toDashboardChart,
  toMonthLabel,
  toTransactionListItem
} from "@/hooks/domains/adapters";
import {
  useMockCategories,
  useMockTransactions,
  useMockUser
} from "@/hooks/domains";
import type { TransactionListItem } from "../types/TransactionListItem";

export const useTransactionsMock = () => {
  const { activeUserId } = useMockUser();
  const { transactions } = useMockTransactions(activeUserId);
  const { getById: getCategoryById, byId: categoriesById } = useMockCategories();

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

