import { StyleSheet } from "react-native";
import { theme } from "@/theme";

export default StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.xxl,
    fontWeight: theme.typography.fontWeights.bold,
    letterSpacing: theme.typography.letterSpacing.tight
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm
  }
});

