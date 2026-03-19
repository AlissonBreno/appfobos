import {  Text, View } from "react-native";
import type { IncomeItem } from "../../../../types/IncomeItem";
import { IncomeCard } from "../IncomeCard";
import styles from "./styles";
import { theme } from "@/theme";

type Props = {
  title?: string;
  items: IncomeItem[];
  currency: "USD" | "BRL" | "EUR";
};

export const IncomeSection = ({ title = "Finanças", items, currency }: Props) => {
  const left = items[0];
  const right = items[1];
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.grid}>
        {left ? <IncomeCard item={left} currency={currency} /> : <View style={{ flex: 1 }} />}
        <View style={{ width: theme.spacing.sm }} />
        {right ? <IncomeCard item={right} currency={currency} /> : <View style={{ flex: 1 }} />}
      </View>
    </View>
  );
};

