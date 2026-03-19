import { StyleSheet } from "react-native";
import { theme } from "@/theme";

export default StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.xs,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.pillStroke,
    borderStyle: "dashed",
    borderRadius: theme.radius.md,
    marginTop: theme.spacing.xs
  },
  pressed: {
    opacity: 0.86
  },
  label: {
    color: theme.colors.primary,
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.fontWeights.semibold
  }
});
