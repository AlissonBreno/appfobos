import { useCallback } from "react";
import { transactionsService } from "@/services";
import { useCategories } from "@/hooks/domains";
import type { CreateTransactionPayload } from "../types/TransactionPayload";

export const useUpdateTransaction = () => {
  const {
    data: { categories }
  } = useCategories();

  const updateTransaction = useCallback(
    (transactionId: number, payload: CreateTransactionPayload) => {
      const { id_users } = payload;
      if (id_users == null) {
        throw new Error("Usuário ativo não encontrado para atualizar transação");
      }

      const categoryId = payload.selectedCategory;
      const categoryExists = categories.some(
        (category) => category.id_categories === categoryId
      );
      if (!categoryExists) {
        throw new Error("Categoria inválida para atualização da transação");
      }

      return transactionsService.updateTransaction({
        transactionId,
        userId: id_users,
        categoryId,
        amount: payload.amount,
        description: payload.description,
        occured_at: payload.occured_at,
        notes: payload.notes,
        attachmentsCount: payload.attachmentsCount
      });
    },
    [categories]
  );

  return { updateTransaction };
};
