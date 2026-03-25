import type { AttachmentDraft } from "@/types/attachmentTransaction";
import { CategoryOption } from "../components/CategorySelector";

export type CreateTransactionPayload = {
  selectedCategory: CategoryOption;
  amount: number;
  description: string;
  occured_at: string;
  notes: string;
  attachmentDrafts: AttachmentDraft[];
  attachmentsCount: number;
  id_users: number;
};