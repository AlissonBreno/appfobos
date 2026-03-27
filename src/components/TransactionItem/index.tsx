import { Text, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@/theme";
import { toAmountCents } from "@/hooks/domains/adapters";
import type { Transaction } from "@/types/transaction";
import type { RecentTransaction } from "@/types/RecentTransaction";
import { formatMoneyFromCents } from "@/utils/format";
import styles from "./styles";

type Props = {
  item: Transaction & Pick<RecentTransaction, "dateLabel" | "icon">;
  currency: "USD" | "BRL" | "EUR";
  onPress?: () => void;
};

export const TransactionItem = ({ item, currency, onPress }: Props) => {
  const amountCents = toAmountCents(item.amount);
  const title = item.description;
  

  const content = (
    <View style={styles.root}>
      <View style={styles.left}>
        <View style={styles.icon}>
          <Ionicons name={item.icon} size={18} color={theme.colors.text} />
        </View>
        <View style={styles.meta}>
          <Text style={styles.merchant}>{title}</Text>
          <Text style={styles.time}>{item.dateLabel}</Text>
        </View>
      </View>
      <Text style={styles.amount}>
        {formatMoneyFromCents(amountCents, currency)}
      </Text>
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [pressed && styles.pressed]}
        accessibilityRole="button"
        accessibilityLabel={`Ver detalhes de ${title}`}
      >
        {content}
      </Pressable>
    );
  }

  return content;
};

