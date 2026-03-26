import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { attachmentsTransactionService } from "@/services";
import { toTransactionAttachment } from "@/hooks/domains/adapters";
import { useTransactionAttachments } from "@/hooks/domains";
import { ScreenContainer } from "@/components/ScreenContainer";
import { TransactionHeader } from "../../components/TransactionHeader";
import { TransactionSummaryCard } from "../../components/TransactionSummaryCard";
import { DetailInfoCard } from "../../components/DetailInfoCard";
import { AttachmentListSection } from "../../components/AttachmentListSection";
import { TransactionActionButtons } from "../../components/TransactionActionButtons";
import { useExcludeTransaction } from "../../hooks/useExcludeTransaction";
import type { TransactionListItem } from "../../types/TransactionListItem";
import { formatCurrentDatePtBr } from "@/utils/format";
import { parseDateTime } from "@/utils/formatDate";
import styles from "./styles";

export const TransactionDetailsScreen = () => {
  const router = useRouter();
  const { excludeTransaction } = useExcludeTransaction();
  const [isRemovingAttachment, setIsRemovingAttachment] = useState(false);

  const params = useLocalSearchParams<{
    transaction?: string;
  }>();

  const transaction = useMemo<TransactionListItem | null>(() => {
    if (!params.transaction) return null;
    try {
      return JSON.parse(params.transaction) as TransactionListItem;
    } catch {
      return null;
    }
  }, [params.transaction]);

  const {
    data: { getByTransactionId },
    loading: attachmentsLoading,
    error: attachmentsError
  } = useTransactionAttachments(transaction?.id_users ?? null);

  const attachments = useMemo(() => {
    if (transaction == null) return [];
    return getByTransactionId(transaction.id_transactions).map(toTransactionAttachment);
  }, [getByTransactionId, transaction]);

  useEffect(() => {
    if (!transaction) router.replace("/transactions");
  }, [ transaction, router]);

  const handleRemoveAttachment = useCallback(
    async (attachmentId: string) => {
      if (transaction?.id_users == null || isRemovingAttachment) return;

      try {
        setIsRemovingAttachment(true);
        await attachmentsTransactionService.softDeleteAttachment(
          attachmentId,
          transaction.id_users
        );
        Alert.alert("Anexo removido", "O anexo foi removido com sucesso.");
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Não foi possível remover o anexo.";
        Alert.alert("Erro ao remover anexo", message);
      } finally {
        setIsRemovingAttachment(false);
      }
    },
    [isRemovingAttachment, transaction]
  );

  if (!transaction) return null;

  const handleEdit = () => {
    const parsedTransaction = {
      id_transactions: transaction?.id_transactions,
      id_users: transaction?.id_users
    }
    router.push({
      pathname: "/transactions/create",
      params: {parsedTransaction: JSON.stringify(parsedTransaction)},
    });
  };
  const handleDelete = () => {
    Alert.alert(
      "Excluir transação",
      "Esta transação será removida das suas movimentações. Deseja continuar?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await excludeTransaction(
                transaction?.id_transactions,
                transaction?.id_users
              );
              router.replace("/transactions");
            } catch (error) {
              const message =
                error instanceof Error
                  ? error.message
                  : "Não foi possível excluir a transação.";
              Alert.alert("Erro ao excluir", message);
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.root}>
      <ScreenContainer>
        <TransactionHeader />

        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <TransactionSummaryCard detail={transaction} currency="BRL" />

          <DetailInfoCard label="Tipo" value={transaction.category} />
          <DetailInfoCard label="Descrição" value={transaction.description} />
          <DetailInfoCard label="Data" value={formatCurrentDatePtBr(parseDateTime(transaction.occured_at))} />
          <DetailInfoCard
            label="Detalhes Adicionais"
            value={transaction.notes || "—"}
          />

          <AttachmentListSection
            attachments={attachments}
            loading={attachmentsLoading}
            errorMessage={attachmentsError?.message ?? null}
            onRemoveAttachment={handleRemoveAttachment}
          />

          <TransactionActionButtons
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </ScrollView>
      </ScreenContainer>
    </View>
  );
};
