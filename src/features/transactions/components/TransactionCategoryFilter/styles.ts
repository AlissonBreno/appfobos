import { StyleSheet } from "react-native";
import { theme } from "@/theme";

export default StyleSheet.create({
  root: {
    marginBottom: theme.spacing.xs
  },
  content: {
    gap: theme.spacing.xs,
    paddingRight: theme.spacing.md
  },
  chip: {
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    paddingHorizontal: theme.spacing.md,
    minHeight: 36,
    alignItems: "center",
    justifyContent: "center"
  },
  chipActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary
  },
  chipInactive: {
    backgroundColor: theme.colors.pill,
    borderColor: theme.colors.pillStroke
  },
  label: {
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: theme.typography.fontWeights.semibold
  },
  labelActive: {
    color: theme.colors.offWhite
  },
  labelInactive: {
    color: theme.colors.textMuted
  },
  pressed: {
    opacity: 0.8
  }
});
