import { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTransactionRelations } from "@/hooks/domains";
import { ScreenContainer } from "@/components/ScreenContainer";
import { theme } from "@/theme";
import { TransactionHeader } from "../../components/TransactionHeader";
import { AttachmentItem } from "../../components/AttachmentItem";
import { AttachmentUploadButton } from "../../components/AttachmentUploadButton";
import { CategorySelector, type CategoryOption } from "../../components/CategorySelector";
import { useCreateTransaction } from "../../hooks/useCreateTransaction";
import { useUpdateTransaction } from "../../hooks/useUpdateTransaction";
import { useTransactionAttachmentsField } from "../../hooks/useTransactionAttachmentsField";
import type { CreateTransactionPayload } from "../../types/TransactionPayload";
import {
  formatMoneyInputMinorUnits,
  minorUnitsToMajorUnits,
  parseMoneyInputToMinorUnits
} from "@/utils/format";
import { occurredAtToDdMmYyyy } from "@/utils/formatDate";
import styles from "./styles";
import { categoryOptions } from "@/constants/categoryOptions";

const formatCurrentDate = () => {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = String(currentDate.getFullYear());

  return `${day}/${month}/${year}`;
};

const isEmpty = (value: string) => value.trim().length === 0;

export const TransactionCreateScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{ parsedTransaction: string }>();

  const parsedTransaction = JSON.parse(params?.parsedTransaction ?? "{}");
  const { id_transactions, id_users } = parsedTransaction;

  const isEditMode = !!(id_transactions && id_users);

  const {
    data: relationsData,
    loading: relationsLoading
  } = useTransactionRelations(id_transactions, id_users);

  const { createTransaction } = useCreateTransaction();
  const { updateTransaction } = useUpdateTransaction();
  const {
    drafts: attachmentDrafts,
    items: attachmentItems,
    attachmentsCount: attachmentItemsCount,
    addFromDevice,
    removeLocal: removeAttachmentDraft,
    removePersisted: removePersistedAttachment,
    commitForTransaction: commitAttachmentDrafts,
    resetDrafts: resetAttachmentDrafts
  } = useTransactionAttachmentsField({
    userId: id_users,
    editTransactionId: isEditMode && id_transactions !== null ? id_transactions : null
  });
  const hasHydratedRef = useRef(false);

  useEffect(() => {
    hasHydratedRef.current = false;
  }, [id_transactions]);

  const [selectedCategory, setSelectedCategory] = useState<CategoryOption>("Depósito");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(1);
  const currentDate = useMemo(() => formatCurrentDate(), []);
  const [amountMinorUnits, setAmountMinorUnits] = useState(0);
  const amountDisplay = formatMoneyInputMinorUnits(amountMinorUnits);
  const [description, setDescription] = useState("");
  const [occuredAt, setOccuredAt] = useState(currentDate);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!isEditMode || !relationsData || hasHydratedRef.current) return;

    const { transaction, category } = relationsData;

    const categoryOption = (category?.name ?? "Saque") as CategoryOption;
    setSelectedCategory(categoryOption);
    setAmountMinorUnits(Math.round(transaction.amount * 100));
    setDescription(transaction.description);
    setNotes(transaction.notes);

    try {
      setOccuredAt(occurredAtToDdMmYyyy(transaction.occured_at));
    } catch {
      setOccuredAt(formatCurrentDate());
    }

    resetAttachmentDrafts();

    hasHydratedRef.current = true;
  }, [isEditMode, relationsData, resetAttachmentDrafts]);

  useEffect(() => {
    if (!isEditMode || relationsLoading || relationsData) return;

    Alert.alert(
      "Transação não encontrada",
      "Não foi possível carregar esta transação para edição.",
      [{ text: "OK", onPress: () => router.back() }]
    );
  }, [isEditMode, relationsLoading, relationsData, router]);

  useEffect(() => {
    const raw = id_transactions;
    if (raw == null || raw === "") return;
    if (id_transactions === null) {
      Alert.alert("Identificador inválido", "O id da transação na URL não é válido.", [
        { text: "OK", onPress: () => router.back() }
      ]);
    }
  }, [id_transactions, router]);

  const handleSaveTransaction = async () => {
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
        selectedCategory: selectedCategoryId,
        amount: amountInMajorUnits,
        description,
        occured_at: occuredAt,
        notes,
        attachmentDrafts,
        attachmentsCount: attachmentItemsCount,
        id_users,
      };
      if (id_users == null) {
        throw new Error("Usuário ativo não encontrado para salvar anexos");
      }

      if (isEditMode) {
        await updateTransaction(id_transactions, payload);
        // commitAttachmentDrafts(id_transactions, id_users);
      } else {
        const created = await createTransaction(payload);
        // commitAttachmentDrafts(created.id_transactions, id_users);
      }

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
          : isEditMode
            ? "Não foi possível atualizar a transação."
            : "Não foi possível cadastrar a transação.";

      Alert.alert(isEditMode ? "Erro ao atualizar" : "Erro ao cadastrar", errorMessage);
    }
  };

  const handleSelectCategory = (category: (typeof categoryOptions)[number]) => {
    setSelectedCategoryId(category.id_categories);
    setSelectedCategory(category.id);
  }

  return (
    <View style={styles.root}>
      <ScreenContainer>
        <TransactionHeader title={isEditMode ? "Editar transação" : "Cadastrar transação"} />

        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.fieldCard}>
            <Text style={styles.fieldLabel}>Categoria</Text>
            <CategorySelector
              selectedCategory={selectedCategory}
              onSelect={handleSelectCategory}
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
            <AttachmentUploadButton onPress={() => void addFromDevice()} />
            {attachmentItems.length > 0 ? (
              <View style={styles.attachmentList}>
                {attachmentItems.map((item) => (
                  <AttachmentItem
                    key={item.key}
                    attachment={item.ui}
                    onRemove={() => {
                      if (item.kind === "draft" && item.clientId) {
                        removeAttachmentDraft(item.clientId);
                      } else if (
                        item.kind === "persisted" &&
                        item.id_attachments != null
                      ) {
                        removePersistedAttachment(item.id_attachments);
                      }
                    }}
                  />
                ))}
              </View>
            ) : null}
            <Text style={styles.attachmentHint}>
              {attachmentItemsCount} anexo(s) selecionado(s)
            </Text>
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
