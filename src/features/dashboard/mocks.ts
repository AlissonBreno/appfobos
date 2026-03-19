import type { BudgetCategory } from "./types/BudgetCategory";
import type { BudgetSummary } from "./types/BudgetSummary";
import type { IncomeItem } from "../../types/IncomeItem";
import type { RecentTransaction } from "../../types/RecentTransaction";

export const dashboardMock = {
  user: {
    firstName: "Alisson"
  },
  summary: {
    totalBalance: 147500,
    leftToBudgetCents: 3200,
    currency: "BRL"
  } satisfies BudgetSummary,
  categories: [
    {
      id: 1,
      name: "Depósitos",
      amountCents: 96500,
      percent: 61,
      tone: "purple"
    },
    {
      id: 2,
      name: "Saques",
      amountCents: 30000,
      percent: 19,
      tone: "cyan"
    },
    {
      id: 3,
      name: "Transferências",
      amountCents: 20000,
      percent: 13,
      tone: "light"
    }
  ] satisfies BudgetCategory[],
  income: [
    {
      id: 1,
      name: "Salário",
      amountCents: 150050,
      icon: "cash-outline"
    },
    {
      id: 2,
      name: "Invetimentos",
      amountCents: 240000,
      icon: "wallet-outline"
    },
  ] satisfies IncomeItem[],
  recent: [
    {
      id: 1,
      merchant: "Supermercado",
      dateLabel: "12:59 PM",
      amountCents: 5499,
      icon: "cart-outline"
    },
    {
      id: 2,
      merchant: "Depósito via PIX",
      dateLabel: "10:09 AM",
      amountCents: 5499,
      icon: "trending-up-outline"
    },
    {
      id: 3,
      merchant: "Pix - Marcelo",
      dateLabel: "23:09 PM",
      amountCents: 5499,
      icon: "trending-down-outline"
    }

  ] satisfies RecentTransaction[]
} as const;

