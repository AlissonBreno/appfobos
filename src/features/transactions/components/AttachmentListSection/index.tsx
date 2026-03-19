import { View, Text } from "react-native";
import { theme } from "@/theme";
import { AttachmentItem } from "../AttachmentItem";
import { AttachmentUploadButton } from "../AttachmentUploadButton";
import type { TransactionAttachment } from "../../types/TransactionDetail";
import styles from "./styles";

type Props = {
  attachments: TransactionAttachment[];
  onRemoveAttachment?: (id: string) => void;
  onAddAttachment?: () => void;
};

export const AttachmentListSection = ({
  attachments,
  onRemoveAttachment,
  onAddAttachment
}: Props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Anexos</Text>
      {attachments.length > 0 && (
        <View style={styles.list}>
          {attachments.map((a) => (
            <AttachmentItem
              key={a.id}
              attachment={a}
              onRemove={onRemoveAttachment ? () => onRemoveAttachment(a.id) : undefined}
            />
          ))}
        </View>
      )}
      <AttachmentUploadButton onPress={onAddAttachment} />
    </View>
  );
};
