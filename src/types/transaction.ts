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
  /** Data em DD/MM/AAAA (ou ISO). A hora de `occured_at` gravada usa sempre o instante de `new Date()` no salvamento. */
  occured_at: string;
  notes: string;
  attachmentsCount: number;
};
