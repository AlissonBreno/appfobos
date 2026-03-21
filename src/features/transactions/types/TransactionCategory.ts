import type { TransactionType } from "./TransactionDetail";

export type TransactionCategory = "deposit" | "withdraw" | "transfer";

export const transactionCategoryLabels: Record<TransactionCategory, string> = {
  deposit: "Depósito",
  withdraw: "Saque",
  transfer: "Transferência"
};

export const transactionCategoryFilterOptions: Array<{
  id: TransactionCategory | "all";
  label: string;
}> = [
  { id: "all", label: "Todas" },
  { id: "deposit", label: transactionCategoryLabels.deposit },
  { id: "withdraw", label: transactionCategoryLabels.withdraw },
  { id: "transfer", label: transactionCategoryLabels.transfer }
];

export const categoryFromTransactionType = (
  transactionType: TransactionType
): TransactionCategory => {
  if (transactionType === "Depósito") return "deposit";
  if (transactionType === "Transferência") return "transfer";
  return "withdraw";
};

export const transactionTypeFromCategory = (
  category: TransactionCategory
): TransactionType => {
  if (category === "deposit") return "Depósito";
  if (category === "transfer") return "Transferência";
  return "Saque";
};
