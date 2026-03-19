import { StyleSheet } from "react-native";
import { theme } from "@/theme";

export default StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface2,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.pill,
    padding: theme.spacing.md,
    ...theme.shadows.soft,
    marginBottom: theme.spacing.sm,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.md,
    fontWeight: theme.typography.fontWeights.semibold
  },
  subtitle: {
    marginTop: 4,
    color: theme.colors.textSubtle,
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: theme.typography.fontWeights.medium
  },
  chartRow: {
    marginTop: theme.spacing.sm,
    flexDirection: "row",
    alignItems: "stretch",
    gap: theme.spacing.sm
  },
  yAxis: {
    width: 38,
    justifyContent: "space-between",
    paddingVertical: 8
  },
  yTick: {
    color: theme.colors.textSubtle,
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: theme.typography.fontWeights.medium
  },
  plot: {
    flex: 1,
    height: 110,
    borderRadius: theme.radius.md,
    backgroundColor: "rgba(255,255,255,0.03)",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)"
  },
  legend: {
    marginTop: theme.spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.lg
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.xs
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5
  },
  legendLabel: {
    color: theme.colors.textSubtle,
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: theme.typography.fontWeights.medium
  }
});

