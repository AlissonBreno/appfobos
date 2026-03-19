import { Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScreenContainer } from "@/components/ScreenContainer";
import { theme } from "@/theme";
import { TransactionHeader } from "../../components/TransactionHeader";
import styles from "./styles";

type SummaryField = {
  label: string;
  value: string;
  isAmount?: boolean;
};

const normalizeParam = (value?: string | string[]) => {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
};

export const TransactionCreateConfirmationScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{
    category?: string | string[];
    amount?: string | string[];
    description?: string | string[];
    date?: string | string[];
  }>();

  const category = normalizeParam(params.category).trim() || "-";
  const amount = normalizeParam(params.amount).trim() || "R$ 0,00";
  const description = normalizeParam(params.description).trim() || "-";
  const date = normalizeParam(params.date).trim() || "-";

  const summaryFields: SummaryField[] = [
    { label: "Categoria", value: category },
    { label: "Valor", value: amount, isAmount: true },
    { label: "Descrição", value: description },
    { label: "Data", value: date }
  ];

  return (
    <View style={styles.root}>
      <ScreenContainer>
        <TransactionHeader title="Sucesso" />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.hero}>
            <View style={styles.iconOuter}>
              <View style={styles.iconInner}>
                <Ionicons
                  name="checkmark"
                  size={32}
                  color={theme.colors.primary}
                />
              </View>
            </View>

            <Text style={styles.title}>Dados cadastrados com sucesso</Text>
            <Text style={styles.description}>
              A transação foi salva e já pode ser visualizada na sua lista de
              movimentações.
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Resumo da transação</Text>

            <View style={styles.summaryList}>
              {summaryFields.map((field) => (
                <View key={field.label} style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>{field.label}</Text>
                  <Text
                    style={[
                      styles.summaryValue,
                      field.isAmount && styles.summaryAmount
                    ]}
                  >
                    {field.value}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={styles.footerActions}>
          <Pressable
            onPress={() => router.replace("/transactions/create")}
            style={({ pressed }) => [styles.secondaryAction, pressed && styles.pressed]}
            accessibilityRole="button"
            accessibilityLabel="Cadastrar nova transação"
          >
            <Ionicons
              name="add-sharp"
              size={18}
              color={theme.colors.text}
            />
            <Text style={styles.secondaryActionLabel}>Nova transação</Text>
          </Pressable>

          <Pressable
            onPress={() => router.replace("/transactions")}
            style={({ pressed }) => [styles.primaryAction, pressed && styles.pressed]}
            accessibilityRole="button"
            accessibilityLabel="Concluir"
          >
            <Text style={styles.primaryActionLabel}>Concluir</Text>
          </Pressable>
        </View>
      </ScreenContainer>
    </View>
  );
};
