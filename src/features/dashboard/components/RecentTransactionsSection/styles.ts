import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  root: {
    paddingTop: theme.spacing.lg,
    paddingBottom: 120
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: theme.typography.fontWeights.semibold,
    marginBottom: theme.spacing.md
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.colors.surface2,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.pill,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm
  },
  icon: {
    width: 34,
    height: 34,
    borderRadius: 14,
    backgroundColor: theme.colors.pill,
    borderWidth: 1,
    borderColor: theme.colors.stroke,
    alignItems: "center",
    justifyContent: "center"
  },
  meta: {
    gap: 2
  },
  merchant: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.fontWeights.semibold
  },
  time: {
    color: theme.colors.textSubtle,
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: theme.typography.fontWeights.medium
  },
  amount: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.fontWeights.semibold
  }
});