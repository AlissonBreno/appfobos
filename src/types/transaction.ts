export type Transaction = {
  id_transactions: number;
  id_users: number;
  id_categories: number;
  amount: number;
  description: string;
  date: string;
  occured_at: string;
  notes: string;
  excluded: boolean;
  attachment_count: number;
  created_at: string;
  updated_at: string | null;
};
