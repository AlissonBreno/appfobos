import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@/theme";
import styles from "./styles";

type Props = {
  onEdit?: () => void;
  onDelete?: () => void;
};

export const TransactionActionButtons = ({ onEdit, onDelete }: Props) => {
  return (
    <View style={styles.root}>
      <Pressable
        onPress={onEdit}
        style={({ pressed }) => [styles.editButton, pressed && styles.pressed]}
        accessibilityRole="button"
        accessibilityLabel="Editar transação"
      >
        <Ionicons
          name="pencil-outline"
          size={18}
          color={theme.colors.text}
        />
        <Text style={styles.editLabel}>Editar</Text>
      </Pressable>
      <Pressable
        onPress={onDelete}
        style={({ pressed }) => [styles.deleteButton, pressed && styles.pressed]}
        accessibilityRole="button"
        accessibilityLabel="Excluir transação"
      >
        <Ionicons
          name="trash-outline"
          size={18}
          color={theme.colors.danger}
        />
        <Text style={styles.deleteLabel}>Excluir</Text>
      </Pressable>
    </View>
  );
};
