import React from "react";
import { View, Text } from "react-native";
import { IconButton } from "@/components/IconButton";
import styles from "./styles";

type Props = {
  title: string;
  onPressSearch?: () => void;
  onPressFilter?: () => void;
};


export const TransactionsHeader = ({ title, onPressSearch, onPressFilter }: Props) => {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.actions}>
        <IconButton
          icon="search-outline"
          accessibilityLabel="Buscar transações"
          onPress={onPressSearch}
        />
        <IconButton
          icon="filter-outline"
          accessibilityLabel="Filtrar transações"
          onPress={onPressFilter}
        />
      </View>
    </View>
  );
};

