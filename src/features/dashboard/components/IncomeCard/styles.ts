import { StyleSheet } from "react-native";
import { theme } from "@/theme";

export default StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 92,
    backgroundColor: theme.colors.surface2,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    padding: theme.spacing.md
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.sm
  },
  name: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: theme.typography.fontWeights.medium,
    marginBottom: 4
  },
  amount: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: theme.typography.fontWeights.semibold,
    letterSpacing: theme.typography.letterSpacing.tight
  }
});