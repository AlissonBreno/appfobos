import { useMemo } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  getReferenceDate,
  toTransactionDetail
} from "@/hooks/domains/adapters";
import {
  useMockTransactionDetailById,
  useMockTransactions,
  useMockUser
} from "@/hooks/domains";
import type { TransactionDetail } from "../types/TransactionDetail";

export const useTransactionDetail = (): {
  detail: TransactionDetail | null;
  currency: "BRL" | "USD" | "EUR";
} => {
  const params = useLocalSearchParams<{ id: string }>();
  const id = params.id ? parseInt(params.id, 10) : null;
  const { activeUserId } = useMockUser();
  const { transactions } = useMockTransactions(activeUserId);
  const domainDetail = useMockTransactionDetailById(id, activeUserId);

  return useMemo(() => {
    if (id == null || isNaN(id)) return { detail: null, currency: "BRL" };
    if (!domainDetail) return { detail: null, currency: "BRL" };

    const referenceDate = getReferenceDate(transactions);
    return {
      detail: toTransactionDetail(domainDetail, referenceDate),
      currency: "BRL"
    };
  }, [domainDetail, id, transactions]);
};
