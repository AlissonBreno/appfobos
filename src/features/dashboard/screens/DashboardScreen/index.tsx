import React, { useEffect, useMemo, useRef } from "react";
import { Animated, ScrollView, View } from "react-native";
import { ScreenContainer } from "@/components/ScreenContainer";
import { useDashboardMock } from "../../hooks/useDashboardMock";
import { BudgetSummaryCard } from "../../components/BudgetSummaryCard";
import { CategoryCarousel } from "../../components/CategoryCarousel";
import { DashboardHeader } from "../../components/DashboardHeader";
import { IncomeSection } from "../../components/IncomeSection";
import { RecentTransactionsSection } from "../../components/RecentTransactionsSection";
import styles from "./styles";

type StaggerKey = "header" | "summary" | "categories" | "income" | "recent";

const useStaggeredEntrance = (keys: StaggerKey[]) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateYByKey = useMemo(() => {
    const map = new Map<StaggerKey, Animated.Value>();
    keys.forEach((k) => map.set(k, new Animated.Value(12)));
    return map;
  }, [keys]);

  useEffect(() => {
    const animations = keys.map((k) =>
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 380,
          useNativeDriver: true
        }),
        Animated.timing(translateYByKey.get(k)!, {
          toValue: 0,
          duration: 420,
          useNativeDriver: true
        })
      ])
    );

    Animated.stagger(90, animations).start();
  }, [keys, opacity, translateYByKey]);

  return { opacity, translateYByKey };
};

export const DashboardScreen = () => {
  const data = useDashboardMock();
  const keys = useMemo<StaggerKey[]>(
    () => ["header", "summary", "categories", "income", "recent"],
    []
  );
  const { opacity, translateYByKey } = useStaggeredEntrance(keys);

  return (
    <View style={styles.root}>
      <ScreenContainer>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Animated.View
            style={{
              opacity,
              transform: [{ translateY: translateYByKey.get("header")! }]
            }}
          >
            <DashboardHeader firstName={data.user.firstName} />
          </Animated.View>

          <Animated.View
            style={{
              opacity,
              transform: [{ translateY: translateYByKey.get("summary")! }]
            }}
          >
            <BudgetSummaryCard summary={data.summary} />
          </Animated.View>

          <Animated.View
            style={{
              opacity,
              transform: [{ translateY: translateYByKey.get("categories")! }]
            }}
          >
            <CategoryCarousel categories={data.categories} currency={data.summary.currency} />
          </Animated.View>

          <Animated.View
            style={{
              opacity,
              transform: [{ translateY: translateYByKey.get("income")! }]
            }}
          >
            <IncomeSection items={data.income} currency={data.summary.currency} />
          </Animated.View>

          <Animated.View
            style={{
              opacity,
              transform: [{ translateY: translateYByKey.get("recent")! }]
            }}
          >
            <RecentTransactionsSection
              items={data.recent}
              currency={data.summary.currency}
            />
          </Animated.View>
        </ScrollView>
      </ScreenContainer>
    </View>
  );
}