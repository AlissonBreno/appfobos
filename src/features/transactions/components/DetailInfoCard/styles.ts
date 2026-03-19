import { StyleSheet } from "react-native";
import { theme } from "@/theme";

export default StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface2,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.pill,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm
  },
  label: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: theme.typography.fontWeights.medium,
    marginBottom: theme.spacing.xxs
  },
  value: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.md,
    fontWeight: theme.typography.fontWeights.semibold
  }
});
