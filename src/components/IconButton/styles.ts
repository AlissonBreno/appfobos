import { StyleSheet } from "react-native";
import { theme } from "@/theme";

export default StyleSheet.create({
  root: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.pill,
    borderWidth: 1,
    borderColor: theme.colors.stroke
  },
  pressed: {
    opacity: 0.86
  }
});

