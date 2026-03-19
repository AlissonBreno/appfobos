export type TransactionType = "Saque" | "Depósito" | "Transferência";

export type TransactionAttachment = {
  id: string;
  name: string;
  type: "pdf" | "image";
};

export type TransactionDetail = {
  id: number;
  merchant: string;
  dateLabel: string;
  amountCents: number;
  icon:
    | "cash-outline"
    | "cart-outline"
    | "wallet-outline"
    | "trending-up-outline"
    | "trending-down-outline";
  tipo: TransactionType;
  descricao: string;
  data: string;
  detalhesAdicionais: string;
  anexos: TransactionAttachment[];
};
