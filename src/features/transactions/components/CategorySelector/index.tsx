import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { categoryOptions } from "@/constants/categoryOptions";
import { theme } from "@/theme";
import styles, { toneStylesByCategory } from "./styles";

export type CategoryOption = (typeof categoryOptions)[number]["id"];

const iconColorByCategory: Record<CategoryOption, string> = {
  Depósito: theme.colors.primary,
  Saque: theme.colors.cyan,
  Transferência: theme.colors.offWhite
};

type Props = {
  selectedCategory: CategoryOption;
  onSelect: (category: (typeof categoryOptions)[number]) => void;
};

export const CategorySelector = ({ selectedCategory, onSelect }: Props) => {
  return (
    <View style={styles.categoryOptionsRow}>
      {categoryOptions.map((category) => {
        const isSelected = selectedCategory === category.id;
        const tone = toneStylesByCategory[category.id];

        return (
          <Pressable
            key={category.id}
            onPress={() => onSelect(category)}
            style={({ pressed }) => [
              styles.categoryCard,
              isSelected ? tone.selectedCard : styles.categoryCardDefault,
              isSelected ? tone.selectedBorder : styles.categoryCardDefaultBorder,
              pressed && styles.pressed
            ]}
            accessibilityRole="button"
            accessibilityLabel={`Selecionar categoria ${category.id}`}
          >
            <View
              style={[
                styles.categoryIconWrap,
                isSelected ? tone.selectedIconWrap : styles.categoryIconWrapDefault
              ]}
            >
              <Ionicons
                name={category.icon}
                size={16}
                color={isSelected ? iconColorByCategory[category.id] : theme.colors.textSubtle}
              />
            </View>
            <Text
              style={[
                styles.categoryLabel,
                isSelected ? tone.selectedLabel : styles.categoryLabelDefault
              ]}
            >
              {category.id}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};
