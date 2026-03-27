import type { AttachmentDraft } from "@/types/attachmentTransaction";

export type CreateTransactionPayload = {
  selectedCategory: number;
  amount: number;
  description: string;
  occured_at: string;
  notes: string;
  attachmentDrafts: AttachmentDraft[];
  attachmentsCount: number;
  id_users: number;
};