import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@/theme";
import styles from "./styles";

type Props = {
  title?: string;
  description?: string;
};

export const AttachmentListEmptyState = ({
  title = "Nenhum anexo",
  description = "Esta transação ainda não possui arquivos anexados."
}: Props) => {
  return (
    <View style={styles.root}>
      <Ionicons
        name="documents-outline"
        size={28}
        color={theme.colors.textMuted}
        accessibilityElementsHidden
        importantForAccessibility="no"
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};
