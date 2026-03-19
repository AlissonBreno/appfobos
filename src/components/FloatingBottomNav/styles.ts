import { StyleSheet } from "react-native";
import { theme } from "@/theme";

export default StyleSheet.create({
  root: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 18,
    alignItems: "center"
  },
  pill: {
    width: 130,
    height: 58,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.surface2,
    borderWidth: 1,
    borderColor: theme.colors.stroke,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    ...theme.shadows.lift
  },
  item: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center"
  },
  itemActive: {
    backgroundColor: theme.colors.primary,
    borderWidth: 1,
    borderColor: theme.colors.pillStroke,
    width: 45,
    height: 45,
    borderRadius: 25,
  },
  pressed: {
    opacity: 0.85
  },
  centerSlot: {
    width: 56,
    alignItems: "center"
  },
  centerButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: theme.colors.pillStroke,
    transform: [{ translateY: -16 }]
  }
});

