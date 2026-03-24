import { attachmentsTransactionMock } from "@/mocks/attachments_transaction";
import type { AttachmentDraft, AttachmentTransaction } from "@/types/attachmentTransaction";
import { parseDateTime, toSqlDateTimeNow } from "@/utils/formatDate";
import { transactionsService } from "./transactions";

type AttachmentsListener = () => void;

const attachmentsListeners = new Set<AttachmentsListener>();
let attachmentsRevision = 0;

export const subscribeAttachmentsChanged = (
  listener: AttachmentsListener
): (() => void) => {
  attachmentsListeners.add(listener);
  return () => {
    attachmentsListeners.delete(listener);
  };
};

export const getAttachmentsRevision = (): number => attachmentsRevision;

const notifyAttachmentsChanged = (): void => {
  attachmentsRevision += 1;
  attachmentsListeners.forEach((listener) => listener());
};

const syncTransactionAttachmentCount = (transactionId: number, userId: number): void => {
  const count = getAttachmentsByTransactionId(transactionId, userId).length;
  transactionsService.applyAttachmentCount(transactionId, userId, count);
};

const getNextAttachmentId = (): number => {
  const attachments = attachmentsTransactionMock as AttachmentTransaction[];
  const highestId = attachments.reduce(
    (accumulator, attachment) => Math.max(accumulator, attachment.id_attachments),
    0
  );
  return highestId + 1;
};

const buildMockUrls = (params: {
  userId: number;
  transactionId: number;
  file_name: string;
}): { file_url: string; storage_path: string } => {
  const encodedName = encodeURIComponent(params.file_name);
  const file_url = `https://example.com/mock/${params.userId}/${params.transactionId}/${encodedName}`;
  const storage_path = `attachments/user/${params.userId}/${params.transactionId}/${params.file_name}`;
  return { file_url, storage_path };
};

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

const addAttachment = (input: {
  transactionId: number;
  userId: number;
  file_name: string;
  mimeType?: string | null;
}): AttachmentTransaction => {
  const trimmedName = input.file_name.trim() || "anexo";
  const id_attachments = getNextAttachmentId();
  const uploaded_at = toSqlDateTimeNow();
  const { file_url, storage_path } = buildMockUrls({
    userId: input.userId,
    transactionId: input.transactionId,
    file_name: trimmedName
  });

  const created: AttachmentTransaction = {
    id_attachments,
    id_transactions: input.transactionId,
    id_users: input.userId,
    file_name: trimmedName,
    file_url,
    storage_path,
    uploaded_at,
    excluded_at: null
  };

  attachmentsTransactionMock.push(created);
  notifyAttachmentsChanged();
  syncTransactionAttachmentCount(input.transactionId, input.userId);

  return created;
};

const softDeleteAttachment = (attachmentId: number, userId: number): void => {
  const attachments = attachmentsTransactionMock as AttachmentTransaction[];
  const index = attachments.findIndex(
    (attachment) =>
      attachment.id_attachments === attachmentId &&
      attachment.id_users === userId &&
      attachment.excluded_at == null
  );

  if (index === -1) {
    throw new Error("Anexo não encontrado para remoção");
  }

  const row = attachments[index];
  const transactionId = row.id_transactions;

  attachments[index] = {
    ...row,
    excluded_at: toSqlDateTimeNow()
  };

  notifyAttachmentsChanged();
  syncTransactionAttachmentCount(transactionId, userId);
};

const commitDraftsForTransaction = (
  drafts: AttachmentDraft[],
  transactionId: number,
  userId: number
): void => {
  for (const draft of drafts) {
    addAttachment({
      transactionId,
      userId,
      file_name: draft.file_name,
      mimeType: draft.mimeType
    });
  }
};

export const attachmentsTransactionService = {
  getAttachments,
  getAttachmentsByTransactionId,
  getAttachmentsByTransactionMap,
  addAttachment,
  softDeleteAttachment,
  commitDraftsForTransaction
};
