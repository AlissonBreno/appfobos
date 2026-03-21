import { Text, View } from "react-native";
import styles from "./styles";

type TransactionListStatusType = "empty" | "end";

type Props = {
  type: TransactionListStatusType;
};

const STATUS_COPY: Record<TransactionListStatusType, { title: string; description: string }> = {
  empty: {
    title: "Nenhuma transacao encontrada",
    description: "Adicione uma nova transacao para comecar sua movimentacao."
  },
  end: {
    title: "Voce chegou ao fim da lista",
    description: "Todas as transacoes disponiveis ja foram carregadas."
  }
};

export const TransactionListStatus = ({ type }: Props) => {
  const copy = STATUS_COPY[type];

  return (
    <View style={styles.root}>
      <Text style={styles.title}>{copy.title}</Text>
      <Text style={styles.description}>{copy.description}</Text>
    </View>
  );
};

