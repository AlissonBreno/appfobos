import { theme } from "@/theme";
import { StyleSheet } from "react-native";


export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  scrollContent: {
    paddingBottom: 140
  },
  carouselDivider: {
    alignSelf: "center",
    width: 26,
    height: 3,
    borderRadius: 99,
    backgroundColor: "rgba(255,255,255,0.20)"
  }
});

