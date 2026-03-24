import { Pressable, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@/theme";
import type { BudgetCategory } from "../../types/BudgetCategory";
import { CategoryMiniCard } from "../CategoryMiniCard";
import styles from "./styles";

type Props = {
  categories: BudgetCategory[];
  currency: "USD" | "BRL" | "EUR";
  onAddPress?: () => void;
};

export const CategoryCarousel = ({ categories, currency, onAddPress }: Props) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      {/* <Pressable
        onPress={onAddPress}
        style={({ pressed }) => [styles.addCard, pressed && { opacity: 0.9 }]}
      >
        <Ionicons name="add" size={22} color={theme.colors.text} />
      </Pressable> */}

      {categories.map((c) => (
        <CategoryMiniCard key={c.id} category={c} currency={currency} />
      ))}
    </ScrollView>
  );
};



