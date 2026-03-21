import type { RecentTransaction } from "@/types/RecentTransaction";
import type { TransactionDetail } from "./types/TransactionDetail";

export type TransactionCategorySeries = {
  id: "deposits" | "withdrawals" | "transfers";
  label: string;
  color: string;
  points: number[];
};

export const transactionsMock = {
  monthLabel: "Março 2026",
  chart: {
    title: "Movimentação por categoria",
    yTicks: [0, 900, 1800, 2700, 3600],
    series: [
      {
        id: "deposits",
        label: "Depósitos",
        color: "#7C4DFF",
        points: [1200, 1500, 1900, 2300, 2100, 2600, 2900, 3200, 3450]
      },
      {
        id: "withdrawals",
        label: "Saques",
        color: "#8FE7FF",
        points: [900, 1050, 1200, 1350, 1280, 1500, 1650, 1780, 1900]
      },
      {
        id: "transfers",
        label: "Transferências",
        color: "rgba(241,243,247,0.6)",
        points: [1100, 1300, 1600, 1750, 1680, 1850, 2100, 2300, 2450]
      }
    ] satisfies TransactionCategorySeries[]
  },
  currency: "BRL" as const,
  items: [
    {
      id: 1,
      merchant: "Supermercado",
      dateLabel: "12:59 PM",
      amountCents: 5499,
      icon: "cart-outline"
    },
    {
      id: 2,
      merchant: "Depósito via PIX",
      dateLabel: "10:09 AM",
      amountCents: 5499,
      icon: "trending-up-outline"
    },
    {
      id: 3,
      merchant: "Pix - Marcelo",
      dateLabel: "23:09 PM",
      amountCents: 5499,
      icon: "trending-down-outline"
    },
    {
      id: 4,
      merchant: "Assinatura Premium",
      dateLabel: "Hoje",
      amountCents: 4990,
      icon: "wallet-outline"
    },
    {
      id: 5,
      merchant: "Pix recebido",
      dateLabel: "Ontem",
      amountCents: 15000,
      icon: "trending-up-outline"
    },
    {
      id: 6,
      merchant: "Transferência enviada",
      dateLabel: "15 Mar",
      amountCents: 32000,
      icon: "trending-down-outline"
    },
    {
      id: 7,
      merchant: "Restaurante",
      dateLabel: "14 Mar",
      amountCents: 8950,
      icon: "cash-outline"
    },
    {
      id: 8,
      merchant: "Salário",
      dateLabel: "10 Mar",
      amountCents: 450000,
      icon: "cash-outline"
    },
    {
      id: 9,
      merchant: "Assinatura Premium",
      dateLabel: "Hoje",
      amountCents: 4990,
      icon: "wallet-outline"
    },
    {
      id: 10,
      merchant: "Pix recebido",
      dateLabel: "Ontem",
      amountCents: 15000,
      icon: "trending-up-outline"
    },
    {
      id: 11,
      merchant: "Transferência enviada",
      dateLabel: "15 Mar",
      amountCents: 32000,
      icon: "trending-down-outline"
    },
    {
      id: 12,
      merchant: "Assinatura Premium",
      dateLabel: "Hoje",
      amountCents: 4990,
      icon: "wallet-outline"
    },
    {
      id: 13,
      merchant: "Pix recebido",
      dateLabel: "Ontem",
      amountCents: 15000,
      icon: "trending-up-outline"
    },
    {
      id: 14,
      merchant: "Transferência enviada",
      dateLabel: "15 Mar",
      amountCents: 32000,
      icon: "trending-down-outline"
    },
    {
      id: 15,
      merchant: "Assinatura Premium",
      dateLabel: "Hoje",
      amountCents: 4990,
      icon: "wallet-outline"
    },
    {
      id: 16,
      merchant: "Pix recebido",
      dateLabel: "Ontem",
      amountCents: 15000,
      icon: "trending-up-outline"
    },
    {
      id: 17,
      merchant: "Transferência enviada",
      dateLabel: "15 Mar",
      amountCents: 32000,
      icon: "trending-down-outline"
    },
    {
      id: 18,
      merchant: "Pix recebido",
      dateLabel: "Ontem",
      amountCents: 15000,
      icon: "trending-up-outline"
    },
    {
      id: 19,
      merchant: "Transferência enviada",
      dateLabel: "15 Mar",
      amountCents: 32000,
      icon: "trending-down-outline"
    },
    {
      id: 20,
      merchant: "Assinatura Premium",
      dateLabel: "Hoje",
      amountCents: 4990,
      icon: "wallet-outline"
    },
    {
      id: 21,
      merchant: "Pix recebido",
      dateLabel: "Ontem",
      amountCents: 15000,
      icon: "trending-up-outline"
    },
    {
      id: 22,
      merchant: "Transferência enviada",
      dateLabel: "15 Mar",
      amountCents: 32000,
      icon: "trending-down-outline"
    },
    {
      id: 23,
      merchant: "Assinatura Premium",
      dateLabel: "Hoje",
      amountCents: 4990,
      icon: "wallet-outline"
    },
    {
      id: 24,
      merchant: "Pix recebido",
      dateLabel: "Ontem",
      amountCents: 15000,
      icon: "trending-up-outline"
    },
    {
      id: 25,
      merchant: "Transferência enviada",
      dateLabel: "15 Mar",
      amountCents: 32000,
      icon: "trending-down-outline"
    },
    {
      id: 26,
      merchant: "Pix recebido",
      dateLabel: "Ontem",
      amountCents: 15000,
      icon: "trending-up-outline"
    },
    {
      id: 27,
      merchant: "Transferência enviada",
      dateLabel: "15 Mar",
      amountCents: 32000,
      icon: "trending-down-outline"
    },
    {
      id: 28,
      merchant: "Assinatura Premium",
      dateLabel: "Hoje",
      amountCents: 4990,
      icon: "wallet-outline"
    },
    {
      id: 29,
      merchant: "Pix recebido",
      dateLabel: "Ontem",
      amountCents: 15000,
      icon: "trending-up-outline"
    },
    {
      id: 30,
      merchant: "Transferência enviada",
      dateLabel: "15 Mar",
      amountCents: 32000,
      icon: "trending-down-outline"
    },
    {
      id: 31,
      merchant: "Assinatura Premium",
      dateLabel: "Hoje",
      amountCents: 4990,
      icon: "wallet-outline"
    },
    {
      id: 32,
      merchant: "Pix recebido",
      dateLabel: "Ontem",
      amountCents: 15000,
      icon: "trending-up-outline"
    },
    {
      id: 33,
      merchant: "Transferência enviada",
      dateLabel: "15 Mar",
      amountCents: 32000,
      icon: "trending-down-outline"
    },
    {
      id: 34,
      merchant: "Pix recebido",
      dateLabel: "Ontem",
      amountCents: 15000,
      icon: "trending-up-outline"
    },
    {
      id: 35,
      merchant: "Transferência enviada",
      dateLabel: "15 Mar",
      amountCents: 32000,
      icon: "trending-down-outline"
    },
    {
      id: 36,
      merchant: "Assinatura Premium",
      dateLabel: "Hoje",
      amountCents: 4990,
      icon: "wallet-outline"
    },
    {
      id: 37,
      merchant: "Pix recebido",
      dateLabel: "Ontem",
      amountCents: 15000,
      icon: "trending-up-outline"
    },
    {
      id: 38,
      merchant: "Transferência enviada",
      dateLabel: "15 Mar",
      amountCents: 32000,
      icon: "trending-down-outline"
    },
    {
      id: 39,
      merchant: "Assinatura Premium",
      dateLabel: "Hoje",
      amountCents: 4990,
      icon: "wallet-outline"
    },
    {
      id: 40,
      merchant: "Pix recebido",
      dateLabel: "Ontem",
      amountCents: 15000,
      icon: "trending-up-outline"
    },
    {
      id: 41,
      merchant: "Transferência enviada",
      dateLabel: "15 Mar",
      amountCents: 32000,
      icon: "trending-down-outline"
    },
    {
      id: 42,
      merchant: "Transferência enviada",
      dateLabel: "15 Mar",
      amountCents: 32000,
      icon: "trending-down-outline"
    },
    {
      id: 43,
      merchant: "Assinatura Premium",
      dateLabel: "Hoje",
      amountCents: 4990,
      icon: "wallet-outline"
    },
    {
      id: 44,
      merchant: "Pix recebido",
      dateLabel: "Ontem",
      amountCents: 15000,
      icon: "trending-up-outline"
    },
    {
      id: 45,
      merchant: "Transferência enviada",
      dateLabel: "15 Mar",
      amountCents: 32000,
      icon: "trending-down-outline"
    },
    {
      id: 46,
      merchant: "Assinatura Premium",
      dateLabel: "Hoje",
      amountCents: 4990,
      icon: "wallet-outline"
    },
    {
      id: 47,
      merchant: "Pix recebido",
      dateLabel: "Ontem",
      amountCents: 15000,
      icon: "trending-up-outline"
    },
    {
      id: 48,
      merchant: "Transferência enviada",
      dateLabel: "15 Mar",
      amountCents: 32000,
      icon: "trending-down-outline"
    },
    {
      id: 49,
      merchant: "Pix recebido",
      dateLabel: "Ontem",
      amountCents: 15000,
      icon: "trending-up-outline"
    },
    {
      id: 50,
      merchant: "Transferência enviada",
      dateLabel: "15 Mar",
      amountCents: 32000,
      icon: "trending-down-outline"
    },
  ] satisfies RecentTransaction[]
} as const;

export const transactionDetailsMock: Record<number, TransactionDetail> = {
  1: {
    id: 1,
    merchant: "Supermercado",
    dateLabel: "12:59 PM",
    amountCents: 5499,
    icon: "cart-outline",
    tipo: "Depósito",
    descricao: "Supermercado",
    data: "18 Mar 2026, 12:59 PM",
    detalhesAdicionais:
      "Compra mensal de mantimentos e produtos de limpeza. Inclui frutas, verduras e produtos básicos.",
    anexos: [
      { id: "a1", name: "Comprovante.pdf", type: "pdf" },
      { id: "a2", name: "Nota_fiscal.jpg", type: "image" }
    ]
  },
  2: {
    id: 2,
    merchant: "Depósito via PIX",
    dateLabel: "10:09 AM",
    amountCents: 5499,
    icon: "trending-up-outline",
    tipo: "Depósito",
    descricao: "Depósito via PIX",
    data: "18 Mar 2026, 10:09 AM",
    detalhesAdicionais: "Depósito recebido por transferência PIX.",
    anexos: []
  },
  3: {
    id: 3,
    merchant: "Pix - Marcelo",
    dateLabel: "23:09 PM",
    amountCents: 5499,
    icon: "trending-down-outline",
    tipo: "Transferência",
    descricao: "Pix - Marcelo",
    data: "17 Mar 2026, 23:09 PM",
    detalhesAdicionais: "Transferência enviada para Marcelo via PIX.",
    anexos: []
  },
  4: {
    id: 4,
    merchant: "Assinatura Premium",
    dateLabel: "Hoje",
    amountCents: 4990,
    icon: "wallet-outline",
    tipo: "Saque",
    descricao: "Assinatura Premium",
    data: "18 Mar 2026, 09:00 AM",
    detalhesAdicionais: "Renovação mensal da assinatura premium.",
    anexos: []
  },
  5: {
    id: 5,
    merchant: "Pix recebido",
    dateLabel: "Ontem",
    amountCents: 15000,
    icon: "trending-up-outline",
    tipo: "Depósito",
    descricao: "Pix - Marcelo",
    data: "17 Mar 2026, 14:30 PM",
    detalhesAdicionais: "Valor recebido de Marcelo via PIX.",
    anexos: [{ id: "a3", name: "Comprovante_pix.pdf", type: "pdf" }]
  },
  6: {
    id: 6,
    merchant: "Transferência enviada",
    dateLabel: "15 Mar",
    amountCents: 32000,
    icon: "trending-down-outline",
    tipo: "Transferência",
    descricao: "Transferência enviada",
    data: "15 Mar 2026, 10:00 AM",
    detalhesAdicionais: "Transferência para conta poupança.",
    anexos: []
  }
};

export const getTransactionDetailById = (id: number): TransactionDetail | undefined =>
  transactionDetailsMock[id];

