import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@/theme";
import styles from "./styles";

type Props = {
  title?: string;
};

export const TransactionHeader = ({ title = "Detalhes" }: Props) => {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <Pressable
        onPress={() => router.back()}
        style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
        accessibilityRole="button"
        accessibilityLabel="Voltar"
      >
        <Ionicons
          name="arrow-back"
          size={22}
          color={theme.colors.text}
        />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.spacer} />
    </View>
  );
};
