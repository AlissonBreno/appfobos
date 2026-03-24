import { CategoryOption } from "../components/CategorySelector";

export type CreateTransactionPayload = {
  selectedCategory: CategoryOption;
  amount: number;
  description: string;
  occured_at: string;
  notes: string;
  attachments: string[];
};