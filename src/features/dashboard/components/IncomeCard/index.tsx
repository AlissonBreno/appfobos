import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@/theme";
import type { IncomeItem } from "../../../../types/IncomeItem";
import { formatMoneyFromCents } from "../../../../utils/format";
import styles from "./styles";

type Props = {
  item: IncomeItem;
  currency: "USD" | "BRL" | "EUR";
};

export const IncomeCard = ({ item, currency }: Props) => {
  return (
    <View style={styles.card}>
      <View style={styles.icon}>
        <Ionicons name={item.icon} size={18} color={theme.colors.offWhite} />
      </View>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.amount}>{formatMoneyFromCents(item.amountCents, currency)}</Text>
    </View>
  );
};

