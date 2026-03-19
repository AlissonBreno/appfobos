import { StyleSheet } from "react-native";
import { theme } from "@/theme";

export default StyleSheet.create({
  root: {
    flexDirection: "row",
    gap: theme.spacing.md,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.xxl
  },
  editButton: {
    flex: 1,
    flexDirection: "row",
    height: 48,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surface2,
    borderWidth: 1,
    borderColor: theme.colors.pillStroke,
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.xs
  },
  pressed: {
    opacity: 0.86
  },
  editLabel: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.md,
    fontWeight: theme.typography.fontWeights.semibold
  },
  deleteButton: {
    flex: 1,
    flexDirection: "row",
    height: 48,
    borderRadius: theme.radius.lg,
    backgroundColor: "rgba(255,69,58,0.15)",
    borderWidth: 1,
    borderColor: "rgba(255,69,58,0.3)",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.xs
  },
  deleteLabel: {
    color: theme.colors.danger,
    fontSize: theme.typography.fontSizes.md,
    fontWeight: theme.typography.fontWeights.semibold
  }
});
