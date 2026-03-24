import { Text, View } from "react-native";
import type { BudgetSummary } from "../../types/BudgetSummary";
import { formatMoneyFromCents } from "@/utils/format";
import styles from "./styles";

type Props = {
  summary: BudgetSummary;
};

export const BudgetSummaryCard = ({ summary }: Props) => {
  const balance = formatMoneyFromCents(summary.totalBalance, summary.currency);
  const left = `${formatMoneyFromCents(summary.leftToBudgetCents, summary.currency)} em rendas esse mês`;

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.left}>
          <Text style={styles.kicker}>Saldo disponível</Text>
          <Text style={styles.amount}>{balance}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{left}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};




