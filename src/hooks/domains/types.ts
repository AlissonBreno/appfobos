export type MockUser = {
  id_users: number;
  name: string;
  login: string;
  password: string;
  budget: number;
  created_at: string;
  updated_at: string | null;
};

export type MockCategory = {
  id_categories: number;
  name: string;
  color: "purple" | "cyan" | "light" | string;
  icon: "trending-up-outline" | "trending-down-outline" | "swap-horizontal" | string;
};

export type MockTransaction = {
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

export type MockAttachmentTransaction = {
  id_attachments: number;
  id_transactions: number;
  id_users: number;
  file_name: string;
  file_url: string;
  storage_path: string;
  uploaded_at: string;
  excluded_at: string | null;
};

export type ActiveMockUser = MockUser & {
  firstName: string;
};

export type MockTransactionWithRelations = {
  transaction: MockTransaction;
  category: MockCategory | null;
  attachments: MockAttachmentTransaction[];
};
