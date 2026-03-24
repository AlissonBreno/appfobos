import { useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/ScreenContainer";
import { theme } from "@/theme";
import { TransactionHeader } from "../../components/TransactionHeader";
import { AttachmentUploadButton } from "../../components/AttachmentUploadButton";
import { CategorySelector, type CategoryOption } from "../../components/CategorySelector";
import { useCreateTransaction } from "../../hooks/useCreateTransaction";
import type { CreateTransactionPayload } from "../../types/TransactionPayload";
import {
  formatMoneyInputMinorUnits,
  minorUnitsToMajorUnits,
  parseMoneyInputToMinorUnits
} from "@/utils/format";
import styles from "./styles";

const formatCurrentDate = () => {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = String(currentDate.getFullYear());

  return `${day}/${month}/${year}`;
};

const isEmpty = (value: string) => value.trim().length === 0;

const isDateDdMmYyyy = (value: string) =>
  /^\d{2}\/\d{2}\/\d{4}$/.test(value.trim());

const buildAttachmentName = (currentLength: number) => {
  const nextIndex = currentLength + 1;
  return `anexo-${nextIndex}.jpg`;
};

export const TransactionCreateScreen = () => {
  const router = useRouter();
  const { createTransaction } = useCreateTransaction();
  const [selectedCategory, setSelectedCategory] = useState<CategoryOption>("Depósito");
  const currentDate = useMemo(() => formatCurrentDate(), []);
  const [amountMinorUnits, setAmountMinorUnits] = useState(0);
  const amountDisplay = formatMoneyInputMinorUnits(amountMinorUnits);
  const [description, setDescription] = useState("");
  const [occuredAt, setOccuredAt] = useState(currentDate);
  const [notes, setNotes] = useState("");
  const [attachments, setAttachments] = useState<string[]>([]);

  const handleAddAttachment = () => {
    setAttachments((previousAttachments) => [
      ...previousAttachments,
      buildAttachmentName(previousAttachments.length)
    ]);
  };

  const handleSaveTransaction = () => {
    if (!selectedCategory) {
      Alert.alert("Campo obrigatório", "Selecione a categoria da transação.");
      return;
    }

    if (amountMinorUnits === 0) {
      Alert.alert("Campo obrigatório", "Informe o valor da transação.");
      return;
    }

    if (isEmpty(description)) {
      Alert.alert("Campo obrigatório", "Informe a descrição da transação.");
      return;
    }

    const amountInMajorUnits = minorUnitsToMajorUnits(amountMinorUnits);

    try {
      const payload: CreateTransactionPayload = {
        selectedCategory,
        amount: amountInMajorUnits,
        description,
        occured_at: occuredAt,
        notes,
        attachments,
      };

      createTransaction(payload);

      const amountSummaryLabel = `R$ ${formatMoneyInputMinorUnits(amountMinorUnits)}`;

      router.push({
        pathname: "/transactions/confirmation",
        params: {
          category: selectedCategory,
          amount: amountSummaryLabel,
          description,
          occured_at: occuredAt
        }
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Não foi possível cadastrar a transação.";

      Alert.alert("Erro ao cadastrar", errorMessage);
    }
  };

  return (
    <View style={styles.root}>
      <ScreenContainer>
        <TransactionHeader title="Cadastrar transação" />

        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.fieldCard}>
            <Text style={styles.fieldLabel}>Categoria</Text>
            <CategorySelector
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </View>

          <View style={styles.fieldCard}>
            <Text style={styles.fieldLabel}>Valor</Text>
            <View style={styles.valueRow}>
              <Text style={styles.valueCurrency}>R$</Text>
              <TextInput
                value={amountDisplay}
                onChangeText={(text) =>
                  setAmountMinorUnits(parseMoneyInputToMinorUnits(text))
                }
                editable={true}
                selectTextOnFocus={false}
                style={styles.valueAmount}
                placeholder="0,00"
                placeholderTextColor={theme.colors.pillStroke}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.fieldCard}>
            <Text style={styles.fieldLabel}>Descrição</Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Ex: Supermercado, Conta de luz..."
              style={styles.textInput}
              placeholderTextColor={theme.colors.textSubtle}
            />
          </View>

          <View style={styles.fieldCard}>
            <Text style={styles.fieldLabel}>Data</Text>
            <View style={styles.dateFieldRow}>
              <TextInput
                value={occuredAt}
                onChangeText={setOccuredAt}
                placeholder="DD/MM/AAAA"
                placeholderTextColor={theme.colors.textMuted}
                style={styles.dateTextInput}
                keyboardType="numbers-and-punctuation"
                accessibilityLabel="Data da transação"
              />
              <Pressable
                onPress={() => setOccuredAt(formatCurrentDate())}
                style={({ pressed }) => [
                  styles.dateTodayButton,
                  pressed && styles.pressed
                ]}
                accessibilityRole="button"
                accessibilityLabel="Usar data de hoje"
              >
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color={theme.colors.textMuted}
                />
              </Pressable>
            </View>
          </View>

          <View style={styles.fieldCard}>
            <Text style={styles.fieldLabel}>Detalhes adicionais (opcional)</Text>
            <TextInput
              value={notes}
              onChangeText={setNotes}
              multiline
              textAlignVertical="top"
              placeholder="Adicione observações ou informações complementares..."
              style={styles.textAreaInput}
              placeholderTextColor={theme.colors.textSubtle}
            />
          </View>

          <View style={styles.fieldCard}>
            <Text style={styles.fieldLabel}>Anexos (opcional)</Text>
            <AttachmentUploadButton onPress={handleAddAttachment} />
            <Text style={styles.fieldLabel}>{attachments.length} anexo(s) selecionado(s)</Text>
          </View>
        </ScrollView>

        <View style={styles.footerActions}>
          <Pressable
            onPress={() => router.replace("/transactions")}
            style={({ pressed }) => [styles.secondaryAction, pressed && styles.pressed]}
            accessibilityRole="button"
            accessibilityLabel="Voltar"
          >
            <Text style={styles.secondaryActionLabel}>Voltar</Text>
          </Pressable>

          <Pressable
            // onPress={() => router.push("/transactions/confirmation")}
            onPress={handleSaveTransaction}
            style={({ pressed }) => [styles.primaryAction, pressed && styles.pressed]}
            accessibilityRole="button"
            accessibilityLabel="Salvar transação"
          >
            <Text style={styles.primaryActionLabel}>Salvar</Text>
          </Pressable>
        </View>
      </ScreenContainer>
    </View>
  );
};
