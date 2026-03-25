import type { RecentTransaction } from "@/types/RecentTransaction";
import type { Transaction } from "@/types/transaction";
import type { TransactionCategory } from "./TransactionCategory";

export type TransactionListItem = Transaction & {
  dateLabel: string;
  icon: RecentTransaction["icon"];
  category: TransactionCategory;
  context: string;
};
