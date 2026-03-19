import { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/ScreenContainer";
import { TransactionDetailsHeader } from "../../components/TransactionDetailsHeader";
import { TransactionSummaryCard } from "../../components/TransactionSummaryCard";
import { DetailInfoCard } from "../../components/DetailInfoCard";
import { AttachmentListSection } from "../../components/AttachmentListSection";
import { TransactionActionButtons } from "../../components/TransactionActionButtons";
import { useTransactionDetail } from "../../hooks/useTransactionDetail";
import styles from "./styles";

export const TransactionDetailsScreen = () => {
  const router = useRouter();
  const { detail, currency } = useTransactionDetail();

  useEffect(() => {
    if (!detail) router.replace("/transactions");
  }, [detail, router]);

  if (!detail) return null;

  const handleEdit = () => {};
  const handleDelete = () => {};
  const handleRemoveAttachment = () => {};
  const handleAddAttachment = () => {};

  return (
    <View style={styles.root}>
      <ScreenContainer>
        <TransactionDetailsHeader />

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
