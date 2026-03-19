import { StyleSheet } from "react-native";
import { theme } from "@/theme";

const DONUT = 86;
const HOLE = 44;


export default StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.xxl,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    ...theme.shadows.lift
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing.lg
  },
  left: {
    flex: 1,
    gap: theme.spacing.sm
  },
  kicker: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.fontWeights.medium
  },
  amount: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.display,
    fontWeight: theme.typography.fontWeights.bold,
    letterSpacing: theme.typography.letterSpacing.tight
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(249,210,102,0.12)",
    borderColor: "rgba(249,210,102,0.22)",
    borderWidth: 1,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 8,
    borderRadius: theme.radius.pill
  },
  badgeText: {
    color: "rgba(255,255,255,0.80)",
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: theme.typography.fontWeights.medium
  },
  donutWrap: {
    width: DONUT,
    height: DONUT,
    alignItems: "center",
    justifyContent: "center"
  },
  donutBase: {
    position: "absolute",
    width: DONUT,
    height: DONUT,
    borderRadius: DONUT / 2,
    borderWidth: 10,
    borderColor: "rgba(255,255,255,0.10)"
  },
  donutSegment: {
    position: "absolute",
    width: DONUT,
    height: DONUT,
    borderRadius: DONUT / 2,
    borderWidth: 10
  },
  segPurple: {
    borderColor: theme.colors.primary,
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    transform: [{ rotate: "-20deg" }]
  },
  segCyan: {
    borderColor: theme.colors.cyan,
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    transform: [{ rotate: "140deg" }],
    opacity: 0.9
  },
  segWhite: {
    borderColor: theme.colors.offWhite,
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    transform: [{ rotate: "230deg" }],
    opacity: 0.9
  },
  donutHole: {
    position: "absolute",
    width: HOLE,
    height: HOLE,
    borderRadius: HOLE / 2,
    backgroundColor: theme.colors.surface
  },
  donutLabel: {
    position: "absolute",
    right: -6,
    top: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: theme.radius.pill,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)"
  },
  donutLabelText: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: theme.typography.fontWeights.medium
  }
});