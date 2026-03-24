import { attachmentsTransactionMock } from "@/mocks/attachments_transaction";
import type { AttachmentTransaction } from "@/types/attachmentTransaction";
import { parseDateTime } from "@/utils/formatDate";

const getAttachments = (
  userId: number | null = null
): AttachmentTransaction[] => {
  const attachments = attachmentsTransactionMock as AttachmentTransaction[];
  return attachments
    .filter((attachment) => attachment.excluded_at == null)
    .filter((attachment) => (userId == null ? true : attachment.id_users === userId))
    .sort(
      (a, b) =>
        parseDateTime(b.uploaded_at).getTime() - parseDateTime(a.uploaded_at).getTime()
    );
};

const getAttachmentsByTransactionId = (
  transactionId: number,
  userId: number | null = null
): AttachmentTransaction[] => {
  return getAttachments(userId).filter(
    (attachment) => attachment.id_transactions === transactionId
  );
};

const getAttachmentsByTransactionMap = (
  userId: number | null = null
): Map<number, AttachmentTransaction[]> => {
  const byTransactionId = new Map<number, AttachmentTransaction[]>();
  getAttachments(userId).forEach((attachment) => {
    const current = byTransactionId.get(attachment.id_transactions) ?? [];
    current.push(attachment);
    byTransactionId.set(attachment.id_transactions, current);
  });
  return byTransactionId;
};

export const attachmentsTransactionService = {
  getAttachments,
  getAttachmentsByTransactionId,
  getAttachmentsByTransactionMap
};
