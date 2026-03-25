import { useCallback, useEffect } from "react";
import { Alert, ScrollView, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { attachmentsTransactionService } from "@/services";
import { ScreenContainer } from "@/components/ScreenContainer";
import { TransactionHeader } from "../../components/TransactionHeader";
import { TransactionSummaryCard } from "../../components/TransactionSummaryCard";
import { DetailInfoCard } from "../../components/DetailInfoCard";
import { AttachmentListSection } from "../../components/AttachmentListSection";
import { TransactionActionButtons } from "../../components/TransactionActionButtons";
import { useExcludeTransaction } from "../../hooks/useExcludeTransaction";
import { formatCurrentDatePtBr } from "@/utils/format";
import styles from "./styles";

export const TransactionDetailsScreen = () => {
  const router = useRouter();
  const { excludeTransaction } = useExcludeTransaction();

  const params = useLocalSearchParams<{
    transaction?: string;
  }>();

  const transaction = params.transaction 
    ? JSON.parse(params.transaction) 
    : null;

  useEffect(() => {
    if (!transaction) router.replace("/transactions");
  }, [ transaction, router]);

  const handleRemoveAttachment = useCallback(
    (attachmentId: string) => {
      if (transaction?.id_users == null) return;
      const parsedId = Number(attachmentId);
      if (!Number.isFinite(parsedId)) return;

      try {
        attachmentsTransactionService.softDeleteAttachment(parsedId, transaction.id_users);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Não foi possível remover o anexo.";
        Alert.alert("Erro ao remover anexo", message);
      }
    },
    [transaction]
  );

  if (!transaction) return null;

  const handleEdit = () => {
    router.push({
      pathname: "/transactions/create",
      params: { id: String(transaction.id_transactions) }
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
          onPress: () => {
            try {
              excludeTransaction(transaction.id_transactions);
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
          <DetailInfoCard label="Data" value={formatCurrentDatePtBr(transaction.occurred_at)} />
          <DetailInfoCard
            label="Detalhes Adicionais"
            value={transaction.notes || "—"}
          />

          <AttachmentListSection
            attachments={transaction?.attachments || []}
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
