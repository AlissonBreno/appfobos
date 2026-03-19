import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@/theme";
import styles, { floatingBottomNavOffset } from "./styles";

type Props = {
  active?: "home" | "transactions";
  onPress?: (key: Props["active"]) => void;
  bottomInset?: number;
};

export const FloatingBottomNav = ({ active = "home", onPress, bottomInset = 0 }: Props) => {
  return (
    <View
      pointerEvents="box-none"
      style={[styles.root, { bottom: floatingBottomNavOffset + bottomInset }]}
    >
      <View style={styles.pill}>
        <Pressable
          onPress={() => onPress?.("home")}
          style={({ pressed }) => [
            styles.item,
            active === "home" && styles.itemActive,
            pressed && styles.pressed
          ]}
        >
          <Ionicons
            name="home-outline"
            size={20}
            color={active === "home" 
              ? theme.colors.offWhite 
              : theme.colors.textSubtle 
            }
          />
        </Pressable>

        <Pressable
          onPress={() => onPress?.("transactions")}
          style={({ pressed }) => [
            styles.item,
            active === "transactions" && styles.itemActive,
            pressed && styles.pressed
          ]}
        >
          <Ionicons
            name="swap-horizontal"
            size={20}
            color={active === "transactions"
              ? theme.colors.offWhite 
              : theme.colors.textSubtle 
            }
          />
        </Pressable>
      </View>
    </View>
  );
};