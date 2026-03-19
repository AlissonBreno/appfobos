import { StyleSheet } from "react-native";
import { layout } from "@/constants";
import { theme } from "@/theme";

export default StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  inner: {
    flex: 1,
    paddingHorizontal: layout.screenHorizontalPadding,
    width: "100%",
    alignSelf: "center",
    maxWidth: layout.maxContentWidth
  }
});