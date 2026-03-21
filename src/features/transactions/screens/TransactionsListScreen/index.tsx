import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/ScreenContainer";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { TransactionItem } from "@/components/TransactionItem";
import { TransactionListHeader } from "../../components/TransactionListHeader";
import { CategoryTrendChartCard } from "../../components/CategoryTrendChartCard";
import { TransactionListFooterLoading } from "../../components/TransactionListFooterLoading";
import { TransactionListStatus } from "../../components/TransactionListStatus";
import { useTransactionsMock } from "../../hooks/useTransactionsMock";
import styles from "./styles";

const PAGE_SIZE = 10;
const LOADING_DELAY_MS = 600;

export const TransactionsListScreen = () => {
  const router = useRouter();
  const data = useTransactionsMock();
  const loadingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loadingLockRef = useRef(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const totalItems = data.items.length;
  const visibleItems = useMemo(
    () => data.items.slice(0, Math.min(visibleCount, totalItems)),
    [data.items, totalItems, visibleCount]
  );
  const hasNoItems = totalItems === 0;
  const hasReachedEnd = !hasNoItems && visibleItems.length >= totalItems;

  useEffect(() => {
    setVisibleCount(Math.min(PAGE_SIZE, totalItems));
  }, [totalItems]);

  useEffect(() => {
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
      loadingLockRef.current = false;
    };
  }, []);

  const loadMore = useCallback(() => {
    if (loadingLockRef.current || hasReachedEnd || hasNoItems) {
      return;
    }

    loadingLockRef.current = true;
    setIsLoadingMore(true);
    loadingTimeoutRef.current = setTimeout(() => {
      setVisibleCount((previousCount) => Math.min(previousCount + PAGE_SIZE, totalItems));
      setIsLoadingMore(false);
      loadingLockRef.current = false;
    }, LOADING_DELAY_MS);
  }, [hasNoItems, hasReachedEnd, totalItems]);

  const renderFooter = useCallback(() => {
    if (hasNoItems) {
      return <TransactionListStatus type="empty" />;
    }

    if (isLoadingMore) {
      return <TransactionListFooterLoading />;
    }

    if (hasReachedEnd) {
      return <TransactionListStatus type="end" />;
    }

    return null;
  }, [hasNoItems, hasReachedEnd, isLoadingMore]);

  return (
    <View style={styles.root}>
      <ScreenContainer>
        <TransactionListHeader title="Transações" />
        <CategoryTrendChartCard
          title={data.chart.title}
          monthLabel={data.monthLabel}
          yTicks={data.chart.yTicks}
          series={data.chart.series}
        />

        <FlatList
          style={styles.listContainer}
          data={visibleItems}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <TransactionItem
              item={item}
              currency={data.currency}
              onPress={() => router.push(`/transactions/${item.id}`)}
            />
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.25}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          ListFooterComponent={renderFooter}
        />
      </ScreenContainer>

      <FloatingActionButton
        accessibilityLabel="Adicionar transação"
        onPress={() => router.push("/transactions/create")}
      />
    </View>
  );
};

