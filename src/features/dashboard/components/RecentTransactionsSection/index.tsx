import { Text, View } from "react-native";
import type { RecentTransaction } from "../../../../types/RecentTransaction";
import { TransactionItem } from "@/components/TransactionItem";
import styles from "./styles";

type Props = {
  title?: string;
  items: RecentTransaction[];
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
        <TransactionItem key={item.id} item={item} currency={currency} />
      ))}
    </View>
  );
};

