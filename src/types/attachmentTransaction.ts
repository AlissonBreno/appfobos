export type AttachmentTransaction = {
  id_attachments: number;
  id_transactions: number;
  id_users: number;
  file_name: string;
  file_url: string;
  storage_path: string;
  uploaded_at: string;
  excluded_at: string | null;
};
