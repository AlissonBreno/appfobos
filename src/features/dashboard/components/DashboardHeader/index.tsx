import { Alert, Pressable, Text, View } from "react-native";
import { BalancePill } from "../BalancePill";
import { Ionicons } from "@expo/vector-icons";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { formatCurrentDatePtBr } from "@/utils/format";
import styles from "./styles";
import { theme } from "@/theme";

type Props = {
  firstName: string;
};

export const DashboardHeader = ({ firstName }: Props) => {
  const { logout, isLoggingOut } = useLogout();

  const handleAvatarPress = () => {
    Alert.alert(
      "Sair",
      "Tem certeza que deseja sair da sua conta?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sair",
          style: "destructive",
          onPress: () => {
            void logout();
          }
        }
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.root}>
      <View style={styles.left}>
        <Pressable
          onPress={handleAvatarPress}
          disabled={isLoggingOut}
          style={({ pressed }) => [
            styles.avatar,
            pressed && styles.avatarPressed,
            isLoggingOut && styles.avatarPressed
          ]}
          accessibilityRole="button"
          accessibilityLabel="Abrir opção de sair da conta"
          accessibilityHint="Solicita confirmação para encerrar a sessão"
        >
          <View style={styles.avatarInner}>
            <View style={styles.avatarIcon}>
              <Ionicons
                name="person-outline"
                size={28}
                color={theme.colors.textMuted}
              />
            </View>
          </View>
        </Pressable>
        <View style={styles.titles}>
          <Text style={styles.greeting}>{formatCurrentDatePtBr()}</Text>
          <Text style={styles.title}>Bem vindo, {firstName}</Text>
        </View>
      </View>

      <BalancePill label="Minhas finanças" />
    </View>
  );
};



