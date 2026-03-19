import { useMemo } from "react";
import { ScrollView, View } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/ScreenContainer";
import { FloatingBottomNav } from "@/components/FloatingBottomNav";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { TransactionItem } from "@/components/TransactionItem";
import { TransactionsHeader } from "../../components/TransactionsHeader";
import { CategoryTrendChartCard } from "../../components/CategoryTrendChartCard";
import { useTransactionsMock } from "../../hooks/useTransactionsMock";
import styles from "./styles";

export const TransactionsListScreen = () => {
  const router = useRouter();
  const data = useTransactionsMock();

  const nav = useMemo(
    () => ({
      home: () => router.push("/"),
      stats: () => router.push("/transactions")
    }),
    [router]
  );

  return (
    <View style={styles.root}>
      <ScreenContainer>
        <TransactionsHeader title="Transações" />
        <CategoryTrendChartCard
          title={data.chart.title}
          monthLabel={data.monthLabel}
          yTicks={data.chart.yTicks}
          series={data.chart.series}
        />

        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >

          <View style={styles.list}>
            {data.items.map((item) => (
              <TransactionItem
                key={item.id}
                item={item}
                currency={data.currency}
                onPress={() => router.push(`/transactions/${item.id}`)}
              />
            ))}
          </View>
        </ScrollView>
      </ScreenContainer>

      <FloatingActionButton accessibilityLabel="Adicionar transação" onPress={() => {}} />

      <FloatingBottomNav
        active="swap"
        onPress={(key) => {
          if (key === "home") nav.home();
          if (key === "swap") nav.stats();
        }}
      />
    </View>
  );
};

