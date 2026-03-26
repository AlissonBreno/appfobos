import { View, Text } from "react-native";
import { AttachmentItem } from "../AttachmentItem";
import { AttachmentListEmptyState } from "../AttachmentListEmptyState";
import { AttachmentUploadButton } from "../AttachmentUploadButton";
import type { TransactionAttachment } from "../../types/TransactionDetail";
import styles from "./styles";

type Props = {
  attachments: TransactionAttachment[];
  loading?: boolean;
  errorMessage?: string | null;
  onRemoveAttachment?: (id: string) => void;
  onAddAttachment?: () => void;
};

export const AttachmentListSection = ({
  attachments,
  loading = false,
  errorMessage = null,
  onRemoveAttachment,
  onAddAttachment
}: Props) => {
  const hasError = Boolean(errorMessage);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Anexos</Text>
      {loading ? (
        <AttachmentListEmptyState
          title="Carregando anexos"
          description="Buscando arquivos vinculados a esta transação."
        />
      ) : hasError ? (
        <AttachmentListEmptyState
          title="Erro ao carregar anexos"
          description={errorMessage ?? "Não foi possível carregar os anexos desta transação."}
        />
      ) : attachments.length > 0 ? (
        <View style={styles.list}>
          {attachments.map((a) => (
            <AttachmentItem
              key={a.id}
              attachment={a}
              onRemove={onRemoveAttachment ? () => onRemoveAttachment(a.id) : undefined}
            />
          ))}
        </View>
      ) : (
        <AttachmentListEmptyState />
      )}
      {onAddAttachment ? (
        <AttachmentUploadButton onPress={onAddAttachment} />
      ) : null}
    </View>
  );
};
