import { useCallback, useMemo, useState } from "react";
import { inferAttachmentType, toTransactionAttachment } from "@/hooks/domains/adapters";
import { useTransactionAttachments } from "@/hooks/domains";
import { attachmentsTransactionService } from "@/services";
import type { AttachmentDraft } from "@/types/attachmentTransaction";
import type { TransactionAttachment } from "../types/TransactionDetail";
import { pickAttachment } from "../infra/pickAttachment";

const createClientId = (): string => {
  const cryptoRef = globalThis.crypto as Crypto | undefined;
  if (cryptoRef?.randomUUID) {
    return cryptoRef.randomUUID();
  }
  return `temp-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
};

export type TransactionAttachmentFieldItem = {
  key: string;
  kind: "draft" | "persisted";
  clientId?: string;
  id_attachments?: number;
  ui: TransactionAttachment;
};

type Params = {
  userId: number | null;
  editTransactionId: number | null;
};

export const useTransactionAttachmentsField = (params: Params) => {
  const {
    data: { getByTransactionId }
  } = useTransactionAttachments(params.userId);

  const [drafts, setDrafts] = useState<AttachmentDraft[]>([]);

  const persisted = useMemo(() => {
    if (params.editTransactionId == null) return [];
    return getByTransactionId(params.editTransactionId);
  }, [getByTransactionId, params.editTransactionId]);

  const attachmentsCount = persisted.length + drafts.length;

  const items = useMemo((): TransactionAttachmentFieldItem[] => {
    const fromPersisted: TransactionAttachmentFieldItem[] = persisted.map((row) => ({
      key: `p-${row.id_attachments}`,
      kind: "persisted",
      id_attachments: row.id_attachments,
      ui: toTransactionAttachment(row)
    }));

    const fromDrafts: TransactionAttachmentFieldItem[] = drafts.map((draft) => ({
      key: `d-${draft.clientId}`,
      kind: "draft",
      clientId: draft.clientId,
      ui: {
        id: draft.clientId,
        name: draft.file_name,
        type: inferAttachmentType(draft.file_name)
      }
    }));

    return [...fromPersisted, ...fromDrafts];
  }, [drafts, persisted]);

  const addFromDevice = useCallback(async () => {
    const picked = await pickAttachment();
    if (!picked) return;

    setDrafts((previous) => [
      ...previous,
      {
        clientId: createClientId(),
        id_transactions: params.editTransactionId,
        file_name: picked.name,
        mimeType: picked.mimeType,
        uri: picked.uri
      }
    ]);
  }, [params.editTransactionId]);

  const removeLocal = useCallback((clientId: string) => {
    setDrafts((previous) => previous.filter((draft) => draft.clientId !== clientId));
  }, []);

  const removePersisted = useCallback(
    (id_attachments: number) => {
      if (params.userId == null) return;
      attachmentsTransactionService.softDeleteAttachment(id_attachments, params.userId);
    },
    [params.userId]
  );

  const commitForTransaction = useCallback((transactionId: number, userId: number) => {
    setDrafts((current) => {
      if (current.length > 0) {
        attachmentsTransactionService.commitDraftsForTransaction(current, transactionId, userId);
      }
      return [];
    });
  }, []);

  const resetDrafts = useCallback(() => {
    setDrafts([]);
  }, []);

  return {
    drafts,
    items,
    attachmentsCount,
    addFromDevice,
    removeLocal,
    removePersisted,
    commitForTransaction,
    resetDrafts
  };
};
