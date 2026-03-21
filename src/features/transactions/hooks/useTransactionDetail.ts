import { useMemo } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  getTransactionDetailById,
  transactionsMock
} from "../mocks";
import type { TransactionDetail } from "../types/TransactionDetail";
import { transactionTypeFromCategory } from "../types/TransactionCategory";
import type { RecentTransaction } from "@/types/RecentTransaction";

const inferCategoryFromIcon = (icon: RecentTransaction["icon"]) => {
  if (icon === "trending-up-outline") return "deposit" as const;
  if (icon === "trending-down-outline") return "transfer" as const;
  return "withdraw" as const;
};

const buildFallbackDetail = (item: RecentTransaction): TransactionDetail => ({
  ...item,
  tipo: transactionTypeFromCategory(inferCategoryFromIcon(item.icon)),
  descricao: item.merchant,
  data: `${item.dateLabel}`,
  detalhesAdicionais: "",
  anexos: []
});

export const useTransactionDetail = (): {
  detail: TransactionDetail | null;
  currency: "BRL" | "USD" | "EUR";
} => {
  const params = useLocalSearchParams<{ id: string }>();
  const id = params.id ? parseInt(params.id, 10) : null;

  return useMemo(() => {
    if (id == null || isNaN(id)) return { detail: null, currency: "BRL" };

    const stored = getTransactionDetailById(id);
    const listItem = transactionsMock.items.find((i) => i.id === id);
    const detail = stored ?? (listItem ? buildFallbackDetail(listItem) : null);

    return {
      detail,
      currency: transactionsMock.currency
    };
  }, [id]);
};
