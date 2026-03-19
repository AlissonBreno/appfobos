import { StyleSheet } from "react-native";
import { theme } from "@/theme";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  scroll: {
    flex: 1
  },
  scrollContent: {
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.lg
  },
  hero: {
    alignItems: "center",
    marginBottom: theme.spacing.xl
  },
  iconOuter: {
    width: 92,
    height: 92,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.categoryDepositCard,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.xl
  },
  iconInner: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.categoryDepositIconBg,
    borderWidth: 1,
    borderColor: theme.colors.categoryDepositIconBorder,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: theme.typography.fontWeights.semibold,
    textAlign: "center",
    marginBottom: theme.spacing.sm
  },
  description: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.fontSizes.md,
    fontWeight: theme.typography.fontWeights.medium,
    textAlign: "center",
    maxWidth: 320,
    lineHeight: 22
  },
  summaryCard: {
    backgroundColor: theme.colors.surface2,
    borderRadius: theme.radius.md,
    borderColor: theme.colors.pill,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md
  },
  summaryTitle: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.fontWeights.semibold,
    marginBottom: theme.spacing.md
  },
  summaryList: {
    gap: theme.spacing.md
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  summaryLabel: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.fontSizes.md,
    fontWeight: theme.typography.fontWeights.medium
  },
  summaryValue: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: theme.typography.fontWeights.semibold
  },
  summaryAmount: {
    color: theme.colors.primary,
    fontSize: theme.typography.fontSizes.xxl,
    fontWeight: theme.typography.fontWeights.bold,
    letterSpacing: theme.typography.letterSpacing.tight
  },
  footerActions: {
    flexDirection: "row",
    gap: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.lg,
    marginBottom: theme.spacing.xs
  },
  secondaryAction: {
    flex: 1,
    height: 52,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surface2,
    borderWidth: 1,
    borderColor: theme.colors.pillStroke,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: theme.spacing.sm
  },
  secondaryActionLabel: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.md,
    fontWeight: theme.typography.fontWeights.semibold
  },
  primaryAction: {
    flex: 1,
    height: 52,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.primary,
    borderWidth: 1,
    borderColor: theme.colors.primary2,
    alignItems: "center",
    justifyContent: "center",
    ...theme.shadows.lift
  },
  primaryActionLabel: {
    color: theme.colors.offWhite,
    fontSize: theme.typography.fontSizes.md,
    fontWeight: theme.typography.fontWeights.semibold
  },
  pressed: {
    opacity: 0.86
  }
});

export default styles;
