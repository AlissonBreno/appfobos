export type RecentTransaction = {
  id: number;
  merchant: string;
  dateLabel: string;
  amountCents: number;
  icon:
  | "cash-outline"
  | "cart-outline"
  | "wallet-outline"
  | "trending-up-outline"
  | "trending-down-outline";
};

