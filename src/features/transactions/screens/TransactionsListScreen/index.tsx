import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/ScreenContainer";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { TransactionItem } from "@/components/TransactionItem";
import { CategoryTrendChartCard } from "@/features/dashboard/components/CategoryTrendChartCard";
import { TransactionListHeader } from "../../components/TransactionListHeader";
import { TransactionListFooterLoading } from "../../components/TransactionListFooterLoading";
import { TransactionSearchBar } from "../../components/TransactionSearchBar";
import { TransactionCategoryFilter } from "../../components/TransactionCategoryFilter";
import { TransactionEmptyState } from "../../components/TransactionEmptyState";
import { TransactionListStatus } from "../../components/TransactionListStatus";
import { useTransactionsMock } from "../../hooks/useTransactionsMock";
import type { TransactionCategory } from "../../types/TransactionCategory";
import styles from "./styles";

const PAGE_SIZE = 10;
const LOADING_DELAY_MS = 600;

export const TransactionsListScreen = () => {
  const router = useRouter();
  const data = useTransactionsMock();
  const loadingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loadingLockRef = useRef(false);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<TransactionCategory | null>(null);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredItems = useMemo(() => {
    return data.items.filter((item) => {
      const matchesCategory = selectedCategory == null || item.category === selectedCategory;
      const searchableContent = `${item.merchant} ${item.description} ${item.context}`.toLowerCase();
      const matchesQuery = normalizedQuery.length === 0 || searchableContent.includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [data.items, normalizedQuery, selectedCategory]);

  const totalItems = filteredItems.length;
  const visibleItems = useMemo(
    () => filteredItems.slice(0, Math.min(visibleCount, totalItems)),
    [filteredItems, totalItems, visibleCount]
  );
  const hasActiveFilters = normalizedQuery.length > 0 || selectedCategory !== null;
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

  useEffect(() => {
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }

    loadingLockRef.current = false;
    setIsLoadingMore(false);
  }, [normalizedQuery, selectedCategory]);

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
      return null;
    }

    if (isLoadingMore) {
      return <TransactionListFooterLoading />;
    }

    if (hasReachedEnd) {
      return <TransactionListStatus type="end" />;
    }

    return null;
  }, [hasNoItems, hasReachedEnd, isLoadingMore]);

  const handleToggleSearch = useCallback(() => {
    setIsSearchVisible((previousState) => {
      if (previousState) {
        setQuery("");
      }
      return !previousState;
    });
  }, []);

  const handleToggleFilter = useCallback(() => {
    setIsFilterVisible((previousState) => !previousState);
  }, []);

  const handleClearSearch = useCallback(() => {
    setQuery("");
  }, []);

  const handleSelectCategory = useCallback((category: TransactionCategory | null) => {
    setSelectedCategory(category);
  }, []);

  const renderEmptyState = useCallback(() => {
    if (hasActiveFilters) {
      return <TransactionEmptyState />;
    }

    return <TransactionListStatus type="empty" />;
  }, [hasActiveFilters]);

  return (
    <View style={styles.root}>
      <ScreenContainer>
        <TransactionListHeader
          title="Transações"
          onPressSearch={handleToggleSearch}
          onPressFilter={handleToggleFilter}
        />
        {isSearchVisible && (
          <TransactionSearchBar
            value={query}
            onChangeText={setQuery}
            onClear={handleClearSearch}
          />
        )}
        {isFilterVisible && (
          <TransactionCategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
          />
        )}

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
          ListEmptyComponent={renderEmptyState}
        />
      </ScreenContainer>

      <FloatingActionButton
        accessibilityLabel="Adicionar transação"
        onPress={() => router.push("/transactions/create")}
      />
    </View>
  );
};

