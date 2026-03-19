import { StyleSheet } from "react-native";
import { theme } from "@/theme";

export default StyleSheet.create({
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.xs,
    backgroundColor: theme.colors.pill,
    borderColor: theme.colors.pillStroke,
    borderWidth: 1,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 8,
    borderRadius: theme.radius.pill
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 99,
    backgroundColor: theme.colors.success
  },
  text: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.fontWeights.medium
  }
});