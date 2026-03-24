import { Pressable, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@/theme";
import styles from "./styles";

type Props = {
  value: string;
  onChangeText: (value: string) => void;
  onClear: () => void;
};

export const TransactionSearchBar = ({ value, onChangeText, onClear }: Props) => {
  return (
    <View style={styles.root}>
      <Ionicons name="search-outline" size={18} color={theme.colors.textSubtle} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Pesquisar transações"
        placeholderTextColor={theme.colors.textSubtle}
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        accessibilityLabel="Campo de pesquisa de transações"
      />
      {value.length > 0 && (
        <Pressable
          onPress={onClear}
          accessibilityRole="button"
          accessibilityLabel="Limpar pesquisa"
          hitSlop={10}
          style={({ pressed }) => [styles.clearAction, pressed && styles.pressed]}
        >
          <Ionicons name="close-circle" size={18} color={theme.colors.textMuted} />
        </Pressable>
      )}
    </View>
  );
};
