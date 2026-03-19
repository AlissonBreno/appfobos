import { Text, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@/theme";
import type { RecentTransaction } from "@/types/RecentTransaction";
import { formatMoneyFromCents } from "@/utils/format";
import styles from "./styles";

type Props = {
  item: RecentTransaction;
  currency: "USD" | "BRL" | "EUR";
  onPress?: () => void;
};

export const TransactionItem = ({ item, currency, onPress }: Props) => {
  const content = (
    <View style={styles.root}>
      <View style={styles.left}>
        <View style={styles.icon}>
          <Ionicons name={item.icon} size={18} color={theme.colors.text} />
        </View>
        <View style={styles.meta}>
          <Text style={styles.merchant}>{item.merchant}</Text>
          <Text style={styles.time}>{item.dateLabel}</Text>
        </View>
      </View>
      <Text style={styles.amount}>
        {formatMoneyFromCents(item.amountCents, currency)}
      </Text>
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [pressed && styles.pressed]}
        accessibilityRole="button"
        accessibilityLabel={`Ver detalhes de ${item.merchant}`}
      >
        {content}
      </Pressable>
    );
  }

  return content;
};

