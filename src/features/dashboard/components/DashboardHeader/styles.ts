import { StyleSheet } from "react-native";
import { theme } from "@/theme";

export default StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.xxl
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 17,
    backgroundColor: theme.colors.surface2,
    borderWidth: 1,
    borderColor: theme.colors.stroke,
    alignItems: "center",
    justifyContent: "center"
  },
  avatarInner: {
    width: 42,
    height: 42,
    borderRadius: 11,
    backgroundColor: "rgba(255,255,255,0.12)"
  },
  avatarIcon: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  titles: {
    gap: 2
  },
  greeting: {
    color: theme.colors.textSubtle,
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: theme.typography.fontWeights.medium
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.md,
    fontWeight: theme.typography.fontWeights.semibold,
    letterSpacing: theme.typography.letterSpacing.tight
  }
});