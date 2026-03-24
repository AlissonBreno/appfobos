import { useMemo } from "react";
import {
  getReferenceDate,
  toBudgetCategories,
  toBudgetSummary,
  toDashboardChart,
  toIncomeItems,
  toMonthLabel,
  toRecentTransaction
} from "@/hooks/domains/adapters";
import {
  useMockCategories,
  useMockTransactions,
  useMockUser
} from "@/hooks/domains";

export const useDashboardMock = () => {
  const { firstName, activeUserId } = useMockUser();
  const { categories, byId: categoriesById, getById: getCategoryById } = useMockCategories();
  const { transactions } = useMockTransactions(activeUserId);

  return useMemo(() => {
    const referenceDate = getReferenceDate(transactions);
    const recent = transactions
      .slice(0, 3)
      .map((transaction) =>
        toRecentTransaction(
          transaction,
          getCategoryById(transaction.id_categories),
          referenceDate
        )
      );

    return {
      user: {
        firstName
      },
      summary: toBudgetSummary(transactions, categoriesById),
      categories: toBudgetCategories(transactions, categories),
      monthLabel: toMonthLabel(transactions),
      chart: toDashboardChart(transactions, categoriesById),
      income: toIncomeItems(transactions, categoriesById),
      recent
    };
  }, [categories, categoriesById, firstName, getCategoryById, transactions]);
};

