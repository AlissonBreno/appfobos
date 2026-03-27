import { useCallback } from "react";
import { transactionsService } from "@/services";

export const useExcludeTransaction = () => {

  const excludeTransaction = useCallback(
    async (transactionId: number, userId: number): Promise<void> => {
      if (userId == null) {
        throw new Error("Usuário ativo não encontrado para excluir transação");
      }

      await transactionsService.excludeTransaction({
        transactionId,
        userId,
      });
    },
    []
  );

  return { excludeTransaction };
};
