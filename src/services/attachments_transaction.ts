import {
  Timestamp,
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import type {
  AttachmentDraft,
  AttachmentTransaction
} from "@/types/attachmentTransaction";
import { parseDateTime } from "@/utils/formatDate";
import { db, storage } from "./firebase";
import { transactionsService } from "./transactions";

type AttachmentsListener = () => void;
const ATTACHMENTS_COLLECTION = "attachments_transaction";

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
  const listenersSnapshot = [...attachmentsListeners];
  queueMicrotask(() => {
    listenersSnapshot.forEach((listener) => listener());
  });
};

const timestampToIso = (value: unknown): string | null => {
  if (value == null) return null;
  if (value instanceof Timestamp) return value.toDate().toISOString();
  if (typeof value === "string") return value;
  return null;
};

const mapFirestoreAttachment = (
  docId: string,
  raw: Record<string, unknown>
): AttachmentTransaction | null => {
  const transactionId =
    typeof raw.id_transactions === "number" ? raw.id_transactions : NaN;
  const userId = typeof raw.id_users === "number" ? raw.id_users : NaN;
  const fileName = typeof raw.file_name === "string" ? raw.file_name : "";
  const fileUrl = typeof raw.file_url === "string" ? raw.file_url : "";
  const storagePath = typeof raw.storage_path === "string" ? raw.storage_path : "";
  const uploadedAt = timestampToIso(raw.uploaded_at);
  const excludedAt = timestampToIso(raw.excluded_at);

  if (
    !Number.isFinite(transactionId) ||
    !Number.isFinite(userId) ||
    fileName.length === 0 ||
    fileUrl.length === 0 ||
    storagePath.length === 0 ||
    uploadedAt == null
  ) {
    return null;
  }

  return {
    id_attachments: docId,
    id_transactions: transactionId,
    id_users: userId,
    file_name: fileName,
    file_url: fileUrl,
    storage_path: storagePath,
    uploaded_at: uploadedAt,
    excluded_at: excludedAt
  };
};

const sanitizeFileName = (fileName: string): string => {
  const normalized = fileName.trim() || "anexo";
  return normalized.replace(/[^\w.\-]/g, "_");
};

const syncTransactionAttachmentCount = async (
  transactionId: number,
  userId: number
): Promise<void> => {
  const count = (await getAttachmentsByTransactionId(transactionId, userId)).length;
  await transactionsService.applyAttachmentCount(transactionId, userId, count);
};

const getAttachments = (
  userId: number | null = null
): Promise<AttachmentTransaction[]> => {
  if (userId == null) {
    return Promise.resolve([]);
  }

  return getDocs(
    query(
      collection(db, ATTACHMENTS_COLLECTION),
      where("id_users", "==", userId),
      where("excluded_at", "==", null)
    )
  ).then((snapshot) =>
    snapshot.docs
      .map((row) =>
        mapFirestoreAttachment(row.id, row.data() as Record<string, unknown>)
      )
      .filter((row): row is AttachmentTransaction => row != null)
  ).then((attachments) =>
    attachments
    .sort(
      (a, b) =>
        parseDateTime(b.uploaded_at).getTime() - parseDateTime(a.uploaded_at).getTime()
    )
  );
};

const getAttachmentsByTransactionId = (
  transactionId: number,
  userId: number | null = null
): Promise<AttachmentTransaction[]> => {
  return getAttachments(userId).then((attachments) =>
    attachments.filter((attachment) => attachment.id_transactions === transactionId)
  );
};

const getAttachmentsByTransactionMap = (
  userId: number | null = null
): Promise<Map<number, AttachmentTransaction[]>> => {
  return getAttachments(userId).then((attachments) => {
    const byTransactionId = new Map<number, AttachmentTransaction[]>();
    attachments.forEach((attachment) => {
      const current = byTransactionId.get(attachment.id_transactions) ?? [];
      current.push(attachment);
      byTransactionId.set(attachment.id_transactions, current);
    });
    return byTransactionId;
  });
};

const addAttachment = async (input: {
  transactionId: number;
  userId: number;
  file_name: string;
  uri: string;
  mimeType?: string | null;
}): Promise<AttachmentTransaction> => {
  const trimmedName = sanitizeFileName(input.file_name);
  const uploadPath = `attachments/user/${input.userId}/${input.transactionId}/${Date.now()}-${trimmedName}`;
  const storageRef = ref(storage, uploadPath);

  const response = await fetch(input.uri);
  const blob = await response.blob();
  await uploadBytes(storageRef, blob, {
    contentType: input.mimeType ?? undefined
  });
  const file_url = await getDownloadURL(storageRef);
  const uploadedAt = Timestamp.now();
  const saved = await addDoc(collection(db, ATTACHMENTS_COLLECTION), {
    id_transactions: input.transactionId,
    id_users: input.userId,
    file_name: trimmedName,
    file_url,
    storage_path: uploadPath,
    uploaded_at: uploadedAt,
    excluded_at: null
  });

  const created: AttachmentTransaction = {
    id_attachments: saved.id,
    id_transactions: input.transactionId,
    id_users: input.userId,
    file_name: trimmedName,
    file_url,
    storage_path: uploadPath,
    uploaded_at: uploadedAt.toDate().toISOString(),
    excluded_at: null
  };

  await syncTransactionAttachmentCount(input.transactionId, input.userId);
  notifyAttachmentsChanged();
  return created;
};

const softDeleteAttachment = async (
  attachmentId: string,
  userId: number
): Promise<void> => {
  const snapshot = await getDocs(
    query(
      collection(db, ATTACHMENTS_COLLECTION),
      where("id_users", "==", userId),
      where("excluded_at", "==", null)
    )
  );
  const row = snapshot.docs.find((docRow) => docRow.id === attachmentId);
  if (!row) {
    throw new Error("Anexo não encontrado para remoção");
  }

  const transactionId = (row.data() as Record<string, unknown>).id_transactions;
  if (typeof transactionId !== "number") {
    throw new Error("Anexo inválido para remoção");
  }

  await updateDoc(row.ref, {
    excluded_at: Timestamp.now()
  });
  await syncTransactionAttachmentCount(transactionId, userId);
  notifyAttachmentsChanged();
};

const commitDraftsForTransaction = async (
  drafts: AttachmentDraft[],
  transactionId: number,
  userId: number
): Promise<void> => {
  for (const draft of drafts) {
    await addAttachment({
      transactionId,
      userId,
      file_name: draft.file_name,
      uri: draft.uri,
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
