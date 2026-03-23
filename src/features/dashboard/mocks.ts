import type { BudgetCategory } from "./types/BudgetCategory";
import type { BudgetSummary } from "./types/BudgetSummary";
import type { IncomeItem } from "../../types/IncomeItem";
import type { RecentTransaction } from "../../types/RecentTransaction";

export type TransactionCategorySeries = {
  id: "deposits" | "withdrawals" | "transfers";
  label: string;
  color: string;
  points: number[];
};

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
  monthLabel: "Março 2026",
  chart: {
    title: "Movimentação por categoria",
    yTicks: [0, 900, 1800, 2700, 3600],
    series: [
      {
        id: "deposits",
        label: "Depósitos",
        color: "#7C4DFF",
        points: [1200, 1500, 1900, 2300, 2100, 2600, 2900, 3200, 3450]
      },
      {
        id: "withdrawals",
        label: "Saques",
        color: "#8FE7FF",
        points: [900, 1050, 1200, 1350, 1280, 1500, 1650, 1780, 1900]
      },
      {
        id: "transfers",
        label: "Transferências",
        color: "rgba(241,243,247,0.6)",
        points: [1100, 1300, 1600, 1750, 1680, 1850, 2100, 2300, 2450]
      }
    ] satisfies TransactionCategorySeries[]
  },
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

