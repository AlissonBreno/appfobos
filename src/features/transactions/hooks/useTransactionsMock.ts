import { useMemo } from "react";
import { getTransactionDetailById, transactionsMock } from "../mocks";
import type { TransactionListItem } from "../types/TransactionListItem";
import {
  categoryFromTransactionType,
  transactionCategoryLabels
} from "../types/TransactionCategory";

const inferCategoryFromIcon = (icon: TransactionListItem["icon"]) => {
  if (icon === "trending-up-outline") return "deposit" as const;
  if (icon === "trending-down-outline") return "transfer" as const;
  return "withdraw" as const;
};

export const useTransactionsMock = () => {
  return useMemo(() => {
    const items: TransactionListItem[] = transactionsMock.items.map((item) => {
      const detail = getTransactionDetailById(item.id);
      const category = detail
        ? categoryFromTransactionType(detail.tipo)
        : inferCategoryFromIcon(item.icon);

      return {
        ...item,
        category,
        description: detail?.descricao ?? item.merchant,
        context: detail?.detalhesAdicionais ?? transactionCategoryLabels[category]
      };
    });

    return {
      ...transactionsMock,
      items
    };
  }, []);
};

