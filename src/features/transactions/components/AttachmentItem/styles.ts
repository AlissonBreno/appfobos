import { StyleSheet } from "react-native";
import { theme } from "@/theme";

export default StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.pill,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.stroke,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.xs,
    gap: theme.spacing.sm
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.04)",
    alignItems: "center",
    justifyContent: "center"
  },
  name: {
    flex: 1,
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.fontWeights.medium
  },
  removeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center"
  },
  pressed: {
    opacity: 0.7
  }
});
