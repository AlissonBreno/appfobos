import { StyleSheet } from "react-native";
import { theme } from "@/theme";

export default StyleSheet.create({
  keyboardRoot: {
    flex: 1
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: theme.spacing.xl
  },
  headerBlock: {
    alignItems: "center",
    marginBottom: theme.spacing.xxl
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: theme.colors.surface2,
    borderWidth: 1,
    borderColor: theme.colors.stroke,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.lg
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.xxl,
    fontWeight: theme.typography.fontWeights.bold,
    textAlign: "center",
    marginBottom: theme.spacing.sm
  },
  subtitle: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.fontSizes.md,
    fontWeight: theme.typography.fontWeights.medium,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: theme.spacing.sm
  },
  field: {
    marginBottom: theme.spacing.md,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.stroke,
    backgroundColor: theme.colors.surface2,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing.md,
    minHeight: 44,
    gap: theme.spacing.xs
  },
  input: {
    flex: 1,
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.fontWeights.medium,
    paddingVertical: theme.spacing.sm
  },
  eyeButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.xs
  },
  error: {
    color: theme.colors.danger,
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.fontWeights.medium,
    marginBottom: theme.spacing.md,
    textAlign: "center"
  },
  primaryAction: {
    width: "100%",
    height: 52,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.primary,
    borderWidth: 1,
    borderColor: theme.colors.primary2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing.sm,
    ...theme.shadows.lift
  },
  primaryActionDisabled: {
    opacity: 0.55
  },
  primaryActionLabel: {
    color: theme.colors.offWhite,
    fontSize: theme.typography.fontSizes.md,
    fontWeight: theme.typography.fontWeights.semibold
  },
  pressed: {
    opacity: 0.86
  },
  footer: {
    marginTop: theme.spacing.xxl,
    paddingHorizontal: theme.spacing.xs
  },
  footerText: {
    color: theme.colors.textSubtle,
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: theme.typography.fontWeights.medium,
    textAlign: "center",
    lineHeight: 18
  },
  footerLink: {
    textDecorationLine: "underline",
    color: theme.colors.textSubtle
  }
});
