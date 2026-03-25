import { useCallback } from "react";
import { transactionsService } from "@/services";

export const useExcludeTransaction = () => {

  const excludeTransaction = useCallback(
    (transactionId: number, userId: number) => {
      if (userId == null) {
        throw new Error("Usuário ativo não encontrado para excluir transação");
      }

      transactionsService.excludeTransaction({
        transactionId,
        userId
      });
    },
    []
  );

  return { excludeTransaction };
};
