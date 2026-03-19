import { useMemo } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  getTransactionDetailById,
  transactionsMock
} from "../mocks";
import type { TransactionDetail } from "../types/TransactionDetail";
import type { RecentTransaction } from "@/types/RecentTransaction";

const buildFallbackDetail = (item: RecentTransaction): TransactionDetail => ({
  ...item,
  tipo: "Saque",
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
