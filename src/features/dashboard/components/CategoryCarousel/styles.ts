import { StyleSheet } from "react-native";
import { theme } from "@/theme";


export default StyleSheet.create({
  content: {
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.md,
    paddingRight: theme.spacing.sm
  },
  addCard: {
    width: 44,
    height: 105,
    borderRadius: theme.radius.xl,
    backgroundColor: theme.colors.surface2,
    borderWidth: 1,
    borderColor: theme.colors.stroke,
    alignItems: "center",
    justifyContent: "center"
  }
});