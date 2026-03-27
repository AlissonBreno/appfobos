import type { BudgetCategory } from "@/features/dashboard/types/BudgetCategory";
import type { BudgetSummary } from "@/features/dashboard/types/BudgetSummary";
import type {
  TransactionAttachment,
  TransactionDetail,
  TransactionType
} from "@/features/transactions/types/TransactionDetail";
import {
  transactionCategoryLabels,
  type TransactionCategory
} from "@/features/transactions/types/TransactionCategory";
import type { TransactionListItem } from "@/features/transactions/types/TransactionListItem";
import type { IncomeItem } from "@/types/IncomeItem";
import type { RecentTransaction } from "@/types/RecentTransaction";
import { parseDateTime } from "@/utils/formatDate";
import type {
  AttachmentTransaction
} from "../../types/attachmentTransaction";
import type { Category } from "../../types/category";
import type { Transaction } from "../../types/transaction";
import type {
  TransactionWithRelations
} from "../../types/transactionWithRelations";

const MONTH_LABEL_FORMATTER = new Intl.DateTimeFormat("pt-BR", {
  month: "long",
  year: "numeric"
});

const SHORT_DAY_LABEL_FORMATTER = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short"
});

const DETAIL_DATE_FORMATTER = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true
});

const capitalizeFirst = (value: string) =>
  value.length > 0 ? value[0].toUpperCase() + value.slice(1) : value;

const mapCategoryNameToPlural = (name: string) => {
  if (name === "Depósito") return "Depósitos";
  if (name === "Saque") return "Saques";
  if (name === "Transferência") return "Transferências";
  return name;
};

const mapCategoryIcon = (
  icon: Category["icon"]
): RecentTransaction["icon"] => {
  if (icon === "trending-up-outline") return "trending-up-outline";
  if (icon === "trending-down-outline") return "trending-down-outline";
  if (icon === "swap-horizontal") return "swap-horizontal";
  return "wallet-outline";
};

const mapCategoryTone = (color: Category["color"]): BudgetCategory["tone"] => {
  if (color === "purple") return "purple";
  if (color === "cyan") return "cyan";
  return "light";
};

const getTransactionCategory = (
  category: Category | null
): TransactionCategory => {
  if (!category) return "withdraw";
  if (category.icon === "trending-up-outline") return "deposit";
  if (category.icon === "swap-horizontal") return "transfer";
  if (category.name === "Transferência") return "transfer";
  return "withdraw";
};

const getTransactionType = (category: Category | null): TransactionType => {
  if (!category) return "Saque";
  if (category.name === "Depósito") return "Depósito";
  if (category.name === "Transferência") return "Transferência";
  return "Saque";
};

const formatDateLabel = (date: Date, referenceDate: Date) => {
  const oneDayMs = 24 * 60 * 60 * 1000;
  const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const normalizedReference = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    referenceDate.getDate()
  );
  const diffDays = Math.round(
    (normalizedReference.getTime() - normalizedDate.getTime()) / oneDayMs
  );

  if (diffDays <= 0) {
    return new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    }).format(date);
  }
  if (diffDays === 1) return "Ontem";

  return SHORT_DAY_LABEL_FORMATTER.format(date).replace(".", "");
};

const formatDetailDate = (date: Date) =>
  DETAIL_DATE_FORMATTER.format(date).replace(".", "");

export const inferAttachmentType = (
  fileName: string
): TransactionAttachment["type"] => {
  const normalized = fileName.toLowerCase();
  if (normalized.endsWith(".pdf")) return "pdf";
  return "image";
};

export const toAmountCents = (amount: number) => Math.round(amount * 100);

export const getReferenceDate = (transactions: Transaction[]) => {
  const newest = transactions[0];
  return newest ? parseDateTime(newest.occured_at) : new Date();
};

export const toRecentTransaction = (
  transaction: Transaction,
  category: Category | null,
  referenceDate: Date
): RecentTransaction => {
  const occurredAt = parseDateTime(transaction.occured_at);
  return {
    id: transaction.id_transactions,
    merchant: transaction.description,
    dateLabel: formatDateLabel(occurredAt, referenceDate),
    amountCents: toAmountCents(transaction.amount),
    icon: mapCategoryIcon(category?.icon ?? "")
  };
};

export const toTransactionListItem = (
  transaction: Transaction,
  category: Category | null,
  referenceDate: Date
): TransactionListItem => {
  const mappedCategory = getTransactionCategory(category);
  const occurredAt = parseDateTime(transaction.occured_at);

  return {
    ...transaction,
    dateLabel: formatDateLabel(occurredAt, referenceDate),
    icon: mapCategoryIcon(category?.icon ?? ""),
    category: mappedCategory,
    context: transaction.notes || transactionCategoryLabels[mappedCategory]
  };
};

export const toTransactionAttachment = (
  attachment: AttachmentTransaction
): TransactionAttachment => {
  return {
    id: String(attachment.id_attachments),
    name: attachment.file_name,
    type: inferAttachmentType(attachment.file_name)
  };
};

export const toTransactionDetail = (
  joined: TransactionWithRelations,
  referenceDate: Date
): TransactionDetail => {
  const occurredAt = parseDateTime(joined.transaction.occured_at);

  return {
    ...toRecentTransaction(joined.transaction, joined.category, referenceDate),
    amount: joined.transaction.amount,
    tipo: getTransactionType(joined.category),
    descricao: joined.transaction.description,
    data: formatDetailDate(occurredAt),
    detalhesAdicionais: joined.transaction.notes,
    anexos: joined.attachments.map(toTransactionAttachment)
  };
};

export const toBudgetSummary = (
  transactions: Transaction[],
  categoriesById: Map<number, Category>
): BudgetSummary => {
  const totals = transactions.reduce(
    (acc, transaction) => {
      const amountCents = toAmountCents(transaction.amount);
      const category = categoriesById.get(transaction.id_categories) ?? null;
      const categoryType = getTransactionCategory(category);

      if (categoryType === "deposit") {
        acc.depositsCents += amountCents;
        acc.totalBalance += amountCents;
      } else {
        // Saques e transferências reduzem o saldo total.
        acc.totalBalance -= amountCents;
      }

      return acc;
    },
    { depositsCents: 0, totalBalance: 0 }
  );

  return {
    totalBalance: totals.totalBalance,
    leftToBudgetCents: totals.depositsCents,
    currency: "BRL"
  };
};

export const toBudgetCategories = (
  transactions: Transaction[],
  categories: Category[]
): BudgetCategory[] => {
  const totalsByCategory = new Map<number, number>();
  transactions.forEach((transaction) => {
    const current = totalsByCategory.get(transaction.id_categories) ?? 0;
    totalsByCategory.set(
      transaction.id_categories,
      current + toAmountCents(transaction.amount)
    );
  });

  const total = Array.from(totalsByCategory.values()).reduce(
    (sum, amount) => sum + amount,
    0
  );

  return categories.map((category) => {
    const amountCents = totalsByCategory.get(category.id_categories) ?? 0;
    const percent = total > 0 ? Math.round((amountCents / total) * 100) : 0;

    return {
      id: category.id_categories,
      name: mapCategoryNameToPlural(category.name),
      amountCents,
      percent,
      tone: mapCategoryTone(category.color)
    };
  });
};

export type TransactionCategorySeries = {
  id: "deposits" | "withdrawals" | "transfers";
  label: string;
  color: string;
  points: number[];
};

const CHART_BUCKETS = 9;

export const toDashboardChart = (
  transactions: Transaction[],
  categoriesById: Map<number, Category>
) => {
  const buckets = {
    deposits: Array.from({ length: CHART_BUCKETS }, () => 0),
    withdrawals: Array.from({ length: CHART_BUCKETS }, () => 0),
    transfers: Array.from({ length: CHART_BUCKETS }, () => 0)
  };

  transactions.forEach((transaction) => {
    const date = parseDateTime(transaction.occured_at);
    const monthDay = Math.min(Math.max(date.getDate(), 1), 31);
    const bucketIndex = Math.min(
      CHART_BUCKETS - 1,
      Math.floor(((monthDay - 1) / 31) * CHART_BUCKETS)
    );
    const category = categoriesById.get(transaction.id_categories) ?? null;
    const categoryType = getTransactionCategory(category);
    const amountCents = toAmountCents(transaction.amount);

    if (categoryType === "deposit") buckets.deposits[bucketIndex] += amountCents;
    else if (categoryType === "transfer") buckets.transfers[bucketIndex] += amountCents;
    else buckets.withdrawals[bucketIndex] += amountCents;
  });

  const maxPoint = Math.max(
    ...buckets.deposits,
    ...buckets.withdrawals,
    ...buckets.transfers,
    0
  );
  const step = Math.max(1, Math.ceil(maxPoint / 4 / 10000)) * 10000;
  const yTicks = [0, step, step * 2, step * 3, step * 4];

  const series: TransactionCategorySeries[] = [
    {
      id: "deposits",
      label: "Depósitos",
      color: "#7C4DFF",
      points: buckets.deposits
    },
    {
      id: "withdrawals",
      label: "Saques",
      color: "#8FE7FF",
      points: buckets.withdrawals
    },
    {
      id: "transfers",
      label: "Transferências",
      color: "rgba(241,243,247,0.6)",
      points: buckets.transfers
    }
  ];

  return {
    title: "Movimentação por categoria",
    yTicks,
    series
  };
};

export const toMonthLabel = (transactions: Transaction[]) => {
  const referenceDate = getReferenceDate(transactions);
  return capitalizeFirst(MONTH_LABEL_FORMATTER.format(referenceDate));
};

export const toIncomeItems = (
  transactions: Transaction[],
  categoriesById: Map<number, Category>
): IncomeItem[] => {
  const groups = new Map<string, number>();

  transactions.forEach((transaction) => {
    const category = categoriesById.get(transaction.id_categories);
    if (category?.name !== "Depósito") return;

    const current = groups.get(transaction.description) ?? 0;
    groups.set(transaction.description, current + toAmountCents(transaction.amount));
  });

  return Array.from(groups.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([name, amountCents], index) => ({
      id: index + 1,
      name,
      amountCents,
      icon: index === 0 ? "cash-outline" : "wallet-outline"
    }));
};
