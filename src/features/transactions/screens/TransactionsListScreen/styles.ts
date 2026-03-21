import { StyleSheet } from "react-native";
import { theme } from "@/theme";

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  listContainer: {
    flex: 1
  },
  scrollContent: {
    paddingTop: theme.spacing.lg,
    paddingBottom: 140
  }
});

