import { Text, View } from "react-native";
import { BalancePill } from "../BalancePill";
import { Ionicons } from "@expo/vector-icons";
import styles from './styles';

type Props = {
  firstName: string;
};

export const DashboardHeader = ({ firstName }: Props) => {
  return (
    <View style={styles.root}>
      <View style={styles.left}>
        <View style={styles.avatar}>
          <View style={styles.avatarInner}>
            <View style={styles.avatarIcon}>
              <Ionicons
                name="person-outline"
                size={28}
                color="rgba(255,255,255,0.65)"
              />
            </View>
          </View>
        </View>
        <View style={styles.titles}>
          <Text style={styles.greeting}>17 de Março</Text>
          <Text style={styles.title}>Bem vindo, {firstName}</Text>
        </View>
      </View>

      <BalancePill label="Minhas finanças" />
    </View>
  );
};



