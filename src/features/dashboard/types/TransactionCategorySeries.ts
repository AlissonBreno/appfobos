export type TransactionCategorySeries = {
  id: "deposits" | "withdrawals" | "transfers";
  label: string;
  color: string;
  points: number[];
};
