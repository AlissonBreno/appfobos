import { StyleSheet } from "react-native";
import { theme } from "@/theme";

export default StyleSheet.create({
  root: {
    paddingTop: theme.spacing.lg,
    gap: theme.spacing.md
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: theme.typography.fontWeights.semibold
  },
  grid: {
    flexDirection: "row"
  }
});