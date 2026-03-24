import { useMemo } from "react";
import { useCategories } from "./useCategories";
import { useTransactionAttachments } from "./useTransactionAttachments";
import { useTransactions } from "./useTransactions";
import type { TransactionWithRelations } from "../../types/transactionWithRelations";

export const useTransactionRelations = (
  transactionId: number | null,
  userId: number | null
) => {
  const {
    data: { getById: getTransactionById },
    loading: transactionsLoading,
    error: transactionsError
  } = useTransactions(userId);
  const {
    data: { getById: getCategoryById },
    loading: categoriesLoading,
    error: categoriesError
  } = useCategories();
  const {
    data: { getByTransactionId },
    loading: attachmentsLoading,
    error: attachmentsError
  } = useTransactionAttachments(userId);

  return useMemo(() => {
    const loading = transactionsLoading || categoriesLoading || attachmentsLoading;
    const error = transactionsError ?? categoriesError ?? attachmentsError;

    if (transactionId == null) {
      return {
        data: null as TransactionWithRelations | null,
        loading,
        error
      };
    }

    const transaction = getTransactionById(transactionId);
    if (!transaction) {
      return {
        data: null as TransactionWithRelations | null,
        loading,
        error
      };
    }

    return {
      data: {
        transaction,
        category: getCategoryById(transaction.id_categories),
        attachments: getByTransactionId(transaction.id_transactions)
      },
      loading,
      error
    };
  }, [
    attachmentsError,
    attachmentsLoading,
    categoriesError,
    categoriesLoading,
    getByTransactionId,
    getCategoryById,
    getTransactionById,
    transactionId,
    transactionsError,
    transactionsLoading
  ]);
};
