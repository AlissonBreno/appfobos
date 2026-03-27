import { Text, View } from "react-native";
import { TransactionItem } from "@/components/TransactionItem";
import type { TransactionListItem } from "../../../transactions/types/TransactionListItem";
import styles from "./styles";

type Props = {
  title?: string;
  items: TransactionListItem[];
  currency: "USD" | "BRL" | "EUR";
};

export const RecentTransactionsSection = ({
  title = "Atividade recente",
  items,
  currency
}: Props) => {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{title}</Text>

      {items.map((item) => (
        <TransactionItem
          key={item.id_transactions}
          item={item}
          currency={currency}
        />
      ))}
    </View>
  );
};

