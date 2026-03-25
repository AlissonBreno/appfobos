import { useCallback, useMemo } from "react";
import { transactionsService } from "@/services";
import { useCategories } from "@/hooks/domains";
import type { CreateTransactionPayload } from "../types/TransactionPayload";

export const useUpdateTransaction = () => {
  const {
    data: { categories }
  } = useCategories();

  const categoryIdByName = useMemo(() => {
    const categoryEntries: [string, number][] = categories.map((category) => [
      category.name,
      category.id_categories
    ]);
    return new Map(categoryEntries);
  }, [categories]);

  const updateTransaction = useCallback(
    (transactionId: number, payload: CreateTransactionPayload) => {
      const { id_users } = payload;
      if (id_users == null) {
        throw new Error("Usuário ativo não encontrado para atualizar transação");
      }

      const categoryId = categoryIdByName.get(payload.selectedCategory);
      if (!categoryId) {
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
    [categoryIdByName]
  );

  return { updateTransaction };
};
