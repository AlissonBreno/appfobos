import { StyleSheet } from "react-native";
import { theme } from "@/theme";

export default StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface2,
    borderRadius: theme.radius.md,
    borderColor: theme.colors.pill,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md
  },
  title: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.fontWeights.medium,
    marginBottom: theme.spacing.sm
  },
  list: {
    marginBottom: theme.spacing.xs
  }
});
