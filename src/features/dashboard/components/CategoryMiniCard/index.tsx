import { Pressable, Text, View } from "react-native";
import { theme } from "@/theme";
import type { BudgetCategory } from "../../types/BudgetCategory";
import { formatMoneyFromCents } from "../../../../utils/format";
import styles from "./styles";

type Props = {
  category: BudgetCategory;
  currency: "USD" | "BRL" | "EUR";
  onPress?: () => void;
};

const toneStyles = (tone: BudgetCategory["tone"]) => {
  if (tone === "purple") {
    return {
      bg: theme.colors.primary,
      fg: theme.colors.text,
      sub: theme.colors.offWhite,
    };
  }
  if (tone === "cyan") {
    return {
      bg: theme.colors.cyan,
      fg: theme.colors.background,
      sub: theme.colors.surface2,
    };
  }
  return {
    bg: theme.colors.offWhite,
    fg: theme.colors.background,
    sub: theme.colors.surface2,
  };
};

export const CategoryMiniCard = ({ category, currency, onPress }: Props) => {
  const t = toneStyles(category.tone);
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: t.bg },
        pressed && { opacity: 0.92 }
      ]}
    >
      <Text style={[styles.name, { color: t.fg }]}>{category.name}</Text>
      <Text style={[styles.amount, { color: t.fg }]}>
        {formatMoneyFromCents(category.amountCents, currency)}
      </Text>

      <View style={styles.metaRow}>
        <View style={[styles.pctPill, { backgroundColor: "rgba(0,0,0,0.14)" }]}>
          <Text style={[styles.pctText, { color: t.sub }]}>{category.percent}%</Text>
        </View>
      </View>
    </Pressable>
  );
};


