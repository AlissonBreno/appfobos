import { useCallback } from "react";
import { transactionsService } from "@/services";
import { useUser } from "@/hooks/domains";

export const useExcludeTransaction = () => {
  const {
    data: { activeUserId }
  } = useUser();

  const excludeTransaction = useCallback(
    (transactionId: number) => {
      if (activeUserId == null) {
        throw new Error("Usuário ativo não encontrado para excluir transação");
      }

      transactionsService.excludeTransaction({
        transactionId,
        userId: activeUserId
      });
    },
    [activeUserId]
  );

  return { excludeTransaction };
};
