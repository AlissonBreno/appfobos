import { useCallback } from "react";
import { transactionsService } from "@/services";
import type { CreateTransactionPayload } from "../types/TransactionPayload";

export const useCreateTransaction = () => {

  const createTransaction = useCallback(
    async (payload: CreateTransactionPayload) => {
      const { id_users } = payload;
      if (id_users == null) {
        throw new Error("Usuário ativo não encontrado para cadastrar transação");
      }

      return transactionsService.createTransaction({
        userId: id_users,
        categoryId: payload.selectedCategory,
        amount: payload.amount,
        description: payload.description,
        occured_at: payload.occured_at,
        notes: payload.notes,
        attachmentsCount: payload.attachmentsCount
      });
    },
    []
  );

  return { createTransaction };
};
