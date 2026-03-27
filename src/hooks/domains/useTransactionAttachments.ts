import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
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

  const [attachments, setAttachments] = useState<AttachmentTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const loaded = await attachmentsTransactionService.getAttachments(userId);
        if (!cancelled) {
          setAttachments(loaded);
        }
      } catch (loadError) {
        if (!cancelled) {
          setAttachments([]);
          setError(
            loadError instanceof Error
              ? loadError
              : new Error("Failed to load transaction attachments")
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [userId, revision]);

  return useMemo(() => {
    const byTransactionId = new Map<number, AttachmentTransaction[]>();
    attachments.forEach((attachment) => {
      const current = byTransactionId.get(attachment.id_transactions) ?? [];
      current.push(attachment);
      byTransactionId.set(attachment.id_transactions, current);
    });
    const getByTransactionId = (transactionId: number) =>
      byTransactionId.get(transactionId) ?? [];

    return {
      data: {
        attachments,
        byTransactionId,
        getByTransactionId
      },
      loading,
      error
    };
  }, [attachments, error, loading]);
};
