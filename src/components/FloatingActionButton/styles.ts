import { StyleSheet } from "react-native";
import { theme } from "@/theme";

export default StyleSheet.create({
  root: {
    position: "absolute",
    right: theme.spacing.lg,
    bottom: 96
  },
  button: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    ...theme.shadows.lift
  },
  pressed: {
    opacity: 0.9
  }
});

