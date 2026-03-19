import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@/theme";
import styles from "./styles";

type Props = {
  active?: "home" | "swap" | "stats" | "settings";
  onPress?: (key: Props["active"]) => void;
};

export const FloatingBottomNav = ({ active = "home", onPress }: Props) => {
  return (
    <View pointerEvents="box-none" style={styles.root}>
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
          onPress={() => onPress?.("stats")}
          style={({ pressed }) => [
            styles.item,
            active === "swap" && styles.itemActive,
            pressed && styles.pressed
          ]}
        >
          <Ionicons
            name="swap-horizontal"
            size={20}
            color={active === "swap" 
              ? theme.colors.offWhite 
              : theme.colors.textSubtle 
            }
          />
        </Pressable>
      </View>
    </View>
  );
};