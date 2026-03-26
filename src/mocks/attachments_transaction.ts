import type { AttachmentTransaction } from "@/types/attachmentTransaction";

export const attachmentsTransactionMock: AttachmentTransaction[] = [
  {
    id_attachments: "1",
    id_transactions: 1,
    id_users: 1,
    file_name: "salario.pdf",
    file_url: "https://example.com/salario.pdf",
    storage_path: "attachments/salario.pdf",
    uploaded_at: "2026-03-24 10:00:00",
    excluded_at: null,
  },
  {
    id_attachments: "2",
    id_transactions: 2,
    id_users: 1,
    file_name: "comprovante.pdf",
    file_url: "https://example.com/salario.pdf",
    storage_path: "attachments/salario.pdf",
    uploaded_at: "2026-03-24 10:00:00",
    excluded_at: null,
  },
];