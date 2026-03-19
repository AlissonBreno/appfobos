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
    paddingBottom: theme.spacing.lg
  },
  fieldCard: {
    backgroundColor: theme.colors.surface2,
    borderRadius: theme.radius.md,
    borderColor: theme.colors.pill,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm
  },
  fieldLabel: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.fontWeights.medium,
    marginBottom: theme.spacing.sm
  },
  selectInput: {
    minHeight: 50,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.stroke,
    paddingHorizontal: theme.spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  selectInputValue: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.md,
    fontWeight: theme.typography.fontWeights.semibold
  },
  selectInputPlaceholder: {
    color: theme.colors.textMuted,
    fontWeight: theme.typography.fontWeights.medium
  },
  valueInput: {
    minHeight: 56,
    paddingHorizontal: 0,
    paddingVertical: 0,
    color: theme.colors.textSubtle,
    fontSize: 42,
    fontWeight: theme.typography.fontWeights.semibold,
    letterSpacing: theme.typography.letterSpacing.tight
  },
  valueRow: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "baseline",
    gap: theme.spacing.xs
  },
  valueCurrency: {
    color: theme.colors.textSubtle,
    fontSize: 32,
    lineHeight: 48,
    fontWeight: theme.typography.fontWeights.semibold,
    letterSpacing: theme.typography.letterSpacing.tight,
    includeFontPadding: false,
    marginBottom: 1
  },
  valueAmount: {
    flex: 1,
    color: theme.colors.pillStroke,
    fontSize: 52,
    lineHeight: 58,
    fontWeight: theme.typography.fontWeights.semibold,
    letterSpacing: theme.typography.letterSpacing.tight,
    margin: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    includeFontPadding: false,
    textAlignVertical: "bottom"
  },
  textInput: {
    minHeight: 50,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.stroke,
    paddingHorizontal: theme.spacing.md,
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.md,
    fontWeight: theme.typography.fontWeights.medium
  },
  textAreaInput: {
    minHeight: 98,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.stroke,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.md,
    fontWeight: theme.typography.fontWeights.medium
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
    justifyContent: "center"
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
