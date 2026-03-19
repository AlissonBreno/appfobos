import { useMemo } from "react";
import { transactionsMock } from "../mocks";

export const useTransactionsMock = () => {
  return useMemo(() => transactionsMock, []);
};

