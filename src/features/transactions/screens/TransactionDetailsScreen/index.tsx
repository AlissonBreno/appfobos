import { useEffect } from "react";
import { Alert, ScrollView, View } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/ScreenContainer";
import { TransactionHeader } from "../../components/TransactionHeader";
import { TransactionSummaryCard } from "../../components/TransactionSummaryCard";
import { DetailInfoCard } from "../../components/DetailInfoCard";
import { AttachmentListSection } from "../../components/AttachmentListSection";
import { TransactionActionButtons } from "../../components/TransactionActionButtons";
import { useExcludeTransaction } from "../../hooks/useExcludeTransaction";
import { useTransactionDetail } from "../../hooks/useTransactionDetail";
import styles from "./styles";

export const TransactionDetailsScreen = () => {
  const router = useRouter();
  const { excludeTransaction } = useExcludeTransaction();
  const { detail, currency } = useTransactionDetail();

  useEffect(() => {
    if (!detail) router.replace("/transactions");
  }, [detail, router]);

  if (!detail) return null;

  const handleEdit = () => {
    router.push({
      pathname: "/transactions/create",
      params: { id: String(detail.id) }
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
              excludeTransaction(detail.id);
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
  const handleRemoveAttachment = () => {};
  const handleAddAttachment = () => {};

  return (
    <View style={styles.root}>
      <ScreenContainer>
        <TransactionHeader />

        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <TransactionSummaryCard detail={detail} currency={currency} />

          <DetailInfoCard label="Tipo" value={detail.tipo} />
          <DetailInfoCard label="Descrição" value={detail.descricao} />
          <DetailInfoCard label="Data" value={detail.data} />
          <DetailInfoCard
            label="Detalhes Adicionais"
            value={detail.detalhesAdicionais || "—"}
          />

          <AttachmentListSection
            attachments={detail.anexos}
            onRemoveAttachment={handleRemoveAttachment}
            onAddAttachment={handleAddAttachment}
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
