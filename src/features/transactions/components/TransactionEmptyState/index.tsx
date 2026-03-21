import { Text, View } from "react-native";
import styles from "./styles";

type Props = {
  title?: string;
  description?: string;
};

export const TransactionEmptyState = ({
  title = "Nenhuma transação encontrada",
  description = "Tente ajustar sua pesquisa ou filtro."
}: Props) => {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};
