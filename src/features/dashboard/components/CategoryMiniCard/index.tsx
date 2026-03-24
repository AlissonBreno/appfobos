import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
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

const iconFromCategory = (categoryName: BudgetCategory["name"]): React.ComponentProps<typeof Ionicons>["name"] => {
  if (categoryName === "Depósitos") return "trending-up-outline";
  if (categoryName === "Saques") return "trending-down-outline";
  if (categoryName === "Transferências") return "swap-horizontal";
  return "pricetag-outline";
};

export const CategoryMiniCard = ({ category, currency, onPress }: Props) => {
  const t = toneStyles(category.tone);
  const iconName = iconFromCategory(category.name);
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
          <Ionicons name={iconName} size={14} color={t.sub} />
        </View>
      </View>
    </Pressable>
  );
};


