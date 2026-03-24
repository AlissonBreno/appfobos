import type { RecentTransaction } from "@/types/RecentTransaction";
import type { TransactionCategory } from "./TransactionCategory";

export type TransactionListItem = RecentTransaction & {
  category: TransactionCategory;
  description: string;
  context: string;
};
