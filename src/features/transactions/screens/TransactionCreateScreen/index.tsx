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
import { useTransactionRelations, useUser } from "@/hooks/domains";
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

const formatCurrentDate = () => {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = String(currentDate.getFullYear());

  return `${day}/${month}/${year}`;
};

const isEmpty = (value: string) => value.trim().length === 0;

const parseEditTransactionId = (raw: string | string[] | undefined): number | null => {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (value == null || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

export const TransactionCreateScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const editTransactionId = useMemo(
    () => parseEditTransactionId(params.id),
    [params.id]
  );
  const isEditMode = editTransactionId !== null;

  const {
    data: { activeUserId }
  } = useUser();
  const {
    data: relationsData,
    loading: relationsLoading
  } = useTransactionRelations(editTransactionId, activeUserId);

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
    userId: activeUserId,
    editTransactionId: isEditMode && editTransactionId !== null ? editTransactionId : null
  });
  const hasHydratedRef = useRef(false);

  useEffect(() => {
    hasHydratedRef.current = false;
  }, [editTransactionId]);

  const [selectedCategory, setSelectedCategory] = useState<CategoryOption>("Depósito");
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
    const raw = params.id;
    if (raw == null || raw === "") return;
    if (editTransactionId === null) {
      Alert.alert("Identificador inválido", "O id da transação na URL não é válido.", [
        { text: "OK", onPress: () => router.back() }
      ]);
    }
  }, [params.id, editTransactionId, router]);

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
        attachmentDrafts,
        attachmentsCount: attachmentItemsCount
      };

      if (activeUserId == null) {
        throw new Error("Usuário ativo não encontrado para salvar anexos");
      }

      if (isEditMode && editTransactionId !== null) {
        updateTransaction(editTransactionId, payload);
        commitAttachmentDrafts(editTransactionId, activeUserId);
      } else {
        const created = createTransaction(payload);
        commitAttachmentDrafts(created.id_transactions, activeUserId);
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
