import {  Text, View } from "react-native";
import styles from "./styles";

type Props = {
  label: string;
};

export const BalancePill = ({ label }: Props) => {
  return (
    <View style={styles.pill}>
      <View style={styles.dot} />
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};



