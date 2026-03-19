import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@/theme";
import { formatMoneyFromCents } from "@/utils/format";
import type { TransactionDetail } from "../../types/TransactionDetail";
import styles from "./styles";

type Props = {
  detail: TransactionDetail;
  currency: "BRL" | "USD" | "EUR";
};

export const TransactionSummaryCard = ({ detail, currency }: Props) => {
  const formatted = formatMoneyFromCents(detail.amountCents, currency);

  return (
    <View style={styles.card}>
      <View style={styles.iconWrap}>
        <Ionicons
          name={detail.icon}
          size={28}
          color={theme.colors.text}
        />
      </View>
      <Text style={styles.label}>Valor</Text>
      <Text style={styles.amount}>{formatted}</Text>
    </View>
  );
};
