import { Pressable, ScrollView, Text, View } from "react-native";
import { transactionCategoryFilterOptions } from "../../types/TransactionCategory";
import type { TransactionCategory } from "../../types/TransactionCategory";
import styles from "./styles";

type Props = {
  selectedCategory: TransactionCategory | null;
  onSelectCategory: (category: TransactionCategory | null) => void;
};

export const TransactionCategoryFilter = ({ selectedCategory, onSelectCategory }: Props) => {
  return (
    <View style={styles.root}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {transactionCategoryFilterOptions.map((option) => {
          const optionCategory = option.id === "all" ? null : option.id;
          const isActive = selectedCategory === optionCategory;

          return (
            <Pressable
              key={option.id}
              onPress={() => onSelectCategory(optionCategory)}
              style={({ pressed }) => [
                styles.chip,
                isActive ? styles.chipActive : styles.chipInactive,
                pressed && styles.pressed
              ]}
              accessibilityRole="button"
              accessibilityLabel={`Filtrar por ${option.label}`}
              accessibilityState={{ selected: isActive }}
            >
              <Text style={[styles.label, isActive ? styles.labelActive : styles.labelInactive]}>
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};
