import { useMemo, useSyncExternalStore } from "react";
import {
  attachmentsTransactionService,
  getAttachmentsRevision,
  subscribeAttachmentsChanged
} from "@/services";
import type { AttachmentTransaction } from "../../types/attachmentTransaction";

export const useTransactionAttachments = (userId: number | null) => {
  const revision = useSyncExternalStore(
    subscribeAttachmentsChanged,
    getAttachmentsRevision,
    getAttachmentsRevision
  );

  return useMemo(() => {
    try {
      const attachments = attachmentsTransactionService.getAttachments(userId) as AttachmentTransaction[];
      const byTransactionId = attachmentsTransactionService.getAttachmentsByTransactionMap(userId);
      const getByTransactionId = (transactionId: number) =>
        byTransactionId.get(transactionId) ?? [];

      return {
        data: {
          attachments,
          byTransactionId,
          getByTransactionId
        },
        loading: false,
        error: null as Error | null
      };
    } catch (error) {
      const byTransactionId = new Map<number, AttachmentTransaction[]>();
      const getByTransactionId = () => [] as AttachmentTransaction[];

      return {
        data: {
          attachments: [] as AttachmentTransaction[],
          byTransactionId,
          getByTransactionId
        },
        loading: false,
        error: error instanceof Error ? error : new Error("Failed to load transaction attachments")
      };
    }
  }, [userId, revision]);
};
