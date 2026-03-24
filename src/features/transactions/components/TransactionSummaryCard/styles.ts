import { StyleSheet } from "react-native";
import { theme } from "@/theme";

export default StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface2,
    borderRadius: theme.radius.md,
    borderColor: theme.colors.pill,
    padding: theme.spacing.xl,
    alignItems: "center",
    marginBottom: theme.spacing.md,
    ...theme.shadows.soft
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.pill,
    borderColor: theme.colors.stroke,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.sm
  },
  label: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.fontWeights.medium,
    marginBottom: theme.spacing.xxs
  },
  amount: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.xxl,
    fontWeight: theme.typography.fontWeights.bold,
    letterSpacing: theme.typography.letterSpacing.tight
  }
});
