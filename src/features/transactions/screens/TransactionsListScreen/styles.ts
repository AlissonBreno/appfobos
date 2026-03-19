import { StyleSheet } from "react-native";
import { theme } from "@/theme";

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  scrollContent: {
    paddingBottom: 140
  },
  list: {
    marginTop: theme.spacing.lg
  }
});

