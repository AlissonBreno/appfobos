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
  amount: number;
  icon:
  | "cash-outline"
  | "cart-outline"
  | "wallet-outline"
  | "trending-up-outline"
  | "trending-down-outline"
  | "swap-horizontal";
  tipo: TransactionType;
  descricao: string;
  data: string;
  detalhesAdicionais: string;
  anexos: TransactionAttachment[];
};
