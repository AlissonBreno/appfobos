import { useMemo } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  getReferenceDate,
  toTransactionDetail
} from "@/hooks/domains/adapters";
import {
  useTransactionRelations,
  useTransactions,
  useUser
} from "@/hooks/domains";
import type { TransactionDetail } from "../types/TransactionDetail";

const useTransactionRouteId = (): number | null => {
  const params = useLocalSearchParams<{ id: string }>();
  if (!params.id) return null;

  const parsed = parseInt(params.id, 10);
  return Number.isNaN(parsed) ? null : parsed;
};

export const useTransactionDetail = (): {
  detail: TransactionDetail | null;
  currency: "BRL" | "USD" | "EUR";
} => {
  const id = useTransactionRouteId();
  const {
    data: { activeUserId }
  } = useUser();
  const {
    data: { transactions }
  } = useTransactions(activeUserId);
  const {
    data: domainDetail
  } = useTransactionRelations(id, activeUserId);

  return useMemo(() => {
    if (id == null) return { detail: null, currency: "BRL" };
    if (!domainDetail) return { detail: null, currency: "BRL" };

    const referenceDate = getReferenceDate(transactions);
    return {
      detail: toTransactionDetail(domainDetail, referenceDate),
      currency: "BRL"
    };
  }, [domainDetail, id, transactions]);
};
