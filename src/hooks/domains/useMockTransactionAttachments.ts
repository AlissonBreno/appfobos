import { useMemo } from "react";
import { attachmentsTransactionMock } from "@/mocks/attachments_transaction";
import type { MockAttachmentTransaction } from "./types";

const parseDateTime = (value: string) => {
  const normalized = value.includes("T") ? value : value.replace(" ", "T");
  const parsed = Date.parse(normalized);
  return Number.isNaN(parsed) ? 0 : parsed;
};

export const useMockTransactionAttachments = (userId: number | null) => {
  return useMemo(() => {
    const all = attachmentsTransactionMock as MockAttachmentTransaction[];
    const attachments = all
      .filter((attachment) => attachment.excluded_at == null)
      .filter((attachment) => (userId == null ? true : attachment.id_users === userId))
      .sort(
        (a, b) =>
          parseDateTime(b.uploaded_at) - parseDateTime(a.uploaded_at)
      );

    const byTransactionId = new Map<number, MockAttachmentTransaction[]>();
    attachments.forEach((attachment) => {
      const current = byTransactionId.get(attachment.id_transactions) ?? [];
      current.push(attachment);
      byTransactionId.set(attachment.id_transactions, current);
    });

    const getByTransactionId = (transactionId: number) =>
      byTransactionId.get(transactionId) ?? [];

    return {
      attachments,
      byTransactionId,
      getByTransactionId
    };
  }, [userId]);
};
