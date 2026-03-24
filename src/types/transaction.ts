export type Transaction = {
  id_transactions: number;
  id_users: number;
  id_categories: number;
  amount: number;
  description: string;
  occured_at: string;
  notes: string;
  excluded: boolean;
  attachment_count: number;
  created_at: string;
  updated_at: string | null;
};

export type CreateTransactionInput = {
  userId: number;
  categoryId: number;
  amount: number;
  description: string;
  occured_at: string;
  notes: string;
  attachmentsCount: number;
};

export type UpdateTransactionInput = {
  transactionId: number;
  userId: number;
  categoryId: number;
  amount: number;
  description: string;
  occured_at: string;
  notes: string;
  attachmentsCount: number;
};

export type ExcludeTransactionInput = {
  transactionId: number;
  userId: number;
};
