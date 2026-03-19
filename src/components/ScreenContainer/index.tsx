import React from "react";
import { View, type ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";


type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export const ScreenContainer = ({ children, style }: Props) => {
  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <View style={[styles.inner, style]}>{children}</View>
    </SafeAreaView>
  );
};



