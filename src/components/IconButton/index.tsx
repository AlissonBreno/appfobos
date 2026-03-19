import { Pressable, type ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@/theme";
import styles from "./styles";

type Props = {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  onPress?: () => void;
  style?: ViewStyle;
  accessibilityLabel: string;
};

export const IconButton = ({ icon, onPress, style, accessibilityLabel }: Props) => {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={({ pressed }) => [styles.root, style, pressed && styles.pressed]}
      hitSlop={10}
    >
      <Ionicons name={icon} size={18} color={theme.colors.offWhite} />
    </Pressable>
  );
};

