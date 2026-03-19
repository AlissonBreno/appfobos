import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/ScreenContainer";
import { theme } from "@/theme";
import { TransactionHeader } from "../../components/TransactionHeader";
import { AttachmentUploadButton } from "../../components/AttachmentUploadButton";
import { CategorySelector, type CategoryOption } from "../../components/CategorySelector";
import styles from "./styles";

const formatCurrentDate = () => {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = String(currentDate.getFullYear());

  return `${day}/${month}/${year}`;
};

export const TransactionCreateScreen = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<CategoryOption>("Depósito");
  const currentDate = useMemo(() => formatCurrentDate(), []);

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
                value="0,00"
                editable={true}
                selectTextOnFocus={false}
                style={styles.valueAmount}
                placeholderTextColor={theme.colors.textSubtle}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.fieldCard}>
            <Text style={styles.fieldLabel}>Descrição</Text>
            <TextInput
              placeholder="Ex: Supermercado, Conta de luz..."
              style={styles.textInput}
              placeholderTextColor={theme.colors.textSubtle}
            />
          </View>

          <View style={styles.fieldCard}>
            <Text style={styles.fieldLabel}>Data</Text>
            <Pressable
              onPress={() => {}}
              style={({ pressed }) => [styles.selectInput, pressed && styles.pressed]}
              accessibilityRole="button"
              accessibilityLabel="Selecionar data"
            >
              <Text style={styles.selectInputValue}>{currentDate}</Text>
              <Ionicons
                name="calendar-outline"
                size={18}
                color={theme.colors.textMuted}
              />
            </Pressable>
          </View>

          <View style={styles.fieldCard}>
            <Text style={styles.fieldLabel}>Detalhes adicionais (opcional)</Text>
            <TextInput
              multiline
              textAlignVertical="top"
              placeholder="Adicione observações ou informações complementares..."
              style={styles.textAreaInput}
              placeholderTextColor={theme.colors.textSubtle}
            />
          </View>

          <View style={styles.fieldCard}>
            <Text style={styles.fieldLabel}>Anexos</Text>
            <AttachmentUploadButton onPress={() => {}} />
          </View>
        </ScrollView>

        <View style={styles.footerActions}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [styles.secondaryAction, pressed && styles.pressed]}
            accessibilityRole="button"
            accessibilityLabel="Voltar"
          >
            <Text style={styles.secondaryActionLabel}>Voltar</Text>
          </Pressable>

          <Pressable
            onPress={() => router.push("/transactions/confirmation")}
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
