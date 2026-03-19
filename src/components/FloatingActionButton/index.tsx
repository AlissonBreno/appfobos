import { Pressable, View, type ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@/theme";
import styles from "./styles";

type Props = {
  icon?: React.ComponentProps<typeof Ionicons>["name"];
  onPress?: () => void;
  style?: ViewStyle;
  accessibilityLabel: string;
};

export const FloatingActionButton = ({
  icon = "add",
  onPress,
  style,
  accessibilityLabel
}: Props) => {
  return (
    <View pointerEvents="box-none" style={[styles.root, style]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        onPress={onPress}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      >
        <Ionicons name={icon} size={22} color={theme.colors.offWhite} />
      </Pressable>
    </View>
  );
};

