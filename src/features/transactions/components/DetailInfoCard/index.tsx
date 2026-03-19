import { View, Text } from "react-native";
import { theme } from "@/theme";
import styles from "./styles";

type Props = {
  label: string;
  value: string;
};

export const DetailInfoCard = ({ label, value }: Props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};
