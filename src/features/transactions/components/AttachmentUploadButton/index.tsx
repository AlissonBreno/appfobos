import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@/theme";
import styles from "./styles";

type Props = {
  onPress?: () => void;
};

export const AttachmentUploadButton = ({ onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.root, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel="Adicionar anexo"
    >
      <Ionicons
        name="add-circle-outline"
        size={20}
        color={theme.colors.primary}
      />
      <Text style={styles.label}>Adicionar anexo</Text>
    </Pressable>
  );
};
