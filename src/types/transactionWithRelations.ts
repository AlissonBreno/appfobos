import type { AttachmentTransaction } from "./attachmentTransaction";
import type { Category } from "./category";
import type { Transaction } from "./transaction";

export type TransactionWithRelations = {
  transaction: Transaction;
  category: Category | null;
  attachments: AttachmentTransaction[];
};
