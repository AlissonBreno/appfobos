import { StyleSheet } from "react-native";
import { theme } from "@/theme";

export default StyleSheet.create({
  root: {
    marginBottom: theme.spacing.sm,
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
  clearAction: {
    alignItems: "center",
    justifyContent: "center"
  },
  pressed: {
    opacity: 0.7
  }
});
