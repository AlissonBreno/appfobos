import { ActivityIndicator, Text, View } from "react-native";
import { theme } from "@/theme";
import styles from "./styles";

type Props = {
  label?: string;
};

export const TransactionListFooterLoading = ({
  label = "Carregando mais transacoes..."
}: Props) => {
  return (
    <View style={styles.root}>
      <ActivityIndicator size="small" color={theme.colors.primary} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

