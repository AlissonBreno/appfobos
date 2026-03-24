import { useMemo } from "react";
import { useMockCategories } from "./useMockCategories";
import { useMockTransactionAttachments } from "./useMockTransactionAttachments";
import { useMockTransactions } from "./useMockTransactions";
import type { MockTransactionWithRelations } from "./types";

export const useMockTransactionDetailById = (
  transactionId: number | null,
  userId: number | null
) => {
  const { getById: getTransactionById } = useMockTransactions(userId);
  const { getById: getCategoryById } = useMockCategories();
  const { getByTransactionId } = useMockTransactionAttachments(userId);

  return useMemo(() => {
    if (transactionId == null) return null;

    const transaction = getTransactionById(transactionId);
    if (!transaction) return null;

    const category = getCategoryById(transaction.id_categories);
    const attachments = getByTransactionId(transaction.id_transactions);

    const detail: MockTransactionWithRelations = {
      transaction,
      category,
      attachments
    };

    return detail;
  }, [getByTransactionId, getCategoryById, getTransactionById, transactionId]);
};
