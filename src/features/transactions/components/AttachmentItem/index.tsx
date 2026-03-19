import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@/theme";
import type { TransactionAttachment } from "../../types/TransactionDetail";
import styles from "./styles";

type Props = {
  attachment: TransactionAttachment;
  onRemove?: () => void;
};

export const AttachmentItem = ({ attachment, onRemove }: Props) => {
  const iconName = attachment.type === "pdf" ? "document-text-outline" : "image-outline";

  return (
    <View style={styles.root}>
      <View style={styles.iconWrap}>
        <Ionicons
          name={iconName as "document-text-outline" | "image-outline"}
          size={18}
          color={theme.colors.textMuted}
        />
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {attachment.name}
      </Text>
      {onRemove && (
        <Pressable
          onPress={onRemove}
          style={({ pressed }) => [styles.removeButton, pressed && styles.pressed]}
          accessibilityRole="button"
          accessibilityLabel="Remover anexo"
        >
          <Ionicons name="close" size={16} color={theme.colors.textMuted} />
        </Pressable>
      )}
    </View>
  );
};
