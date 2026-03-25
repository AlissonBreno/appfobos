import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { ScreenContainer } from "@/components/ScreenContainer";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { theme } from "@/theme";
import styles from "./styles";

const PRIVACY_URL = "https://example.com/privacy";
const TERMS_URL = "https://example.com/terms";

export const LoginScreen = () => {
  const { submit, error, isSubmitting } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);

  const onSubmit = () => {
    void submit(email, password);
  };

  return (
    <ScreenContainer style={styles.keyboardRoot}>
      <KeyboardAvoidingView
        style={styles.keyboardRoot}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerBlock}>
            <View style={styles.iconCircle}>
              <Ionicons name="wallet-outline" size={32} color={theme.colors.primary} />
            </View>
            <Text style={styles.title}>Bem-vindo</Text>
            <Text style={styles.subtitle}>
              Entre com seu e-mail e senha para acessar suas finanças.
            </Text>
          </View>

          <View style={styles.field}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="E-mail"
              placeholderTextColor={theme.colors.textSubtle}
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              keyboardType="email-address"
              textContentType="emailAddress"
              returnKeyType="next"
              accessibilityLabel="Campo de e-mail"
            />
            <Ionicons name="person-outline" size={18} color={theme.colors.textSubtle} />
          </View>

          <View style={styles.field}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Senha"
              placeholderTextColor={theme.colors.textSubtle}
              style={styles.input}
              secureTextEntry={secure}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="password"
              textContentType="password"
              returnKeyType="go"
              onSubmitEditing={onSubmit}
              accessibilityLabel="Campo de senha"
            />
            <Pressable
              onPress={() => setSecure((v) => !v)}
              hitSlop={10}
              style={({ pressed }) => [styles.eyeButton, pressed && styles.pressed]}
              accessibilityRole="button"
              accessibilityLabel={secure ? "Mostrar senha" : "Ocultar senha"}
            >
              <Ionicons
                name={secure ? "eye-outline" : "eye-off-outline"}
                size={20}
                color={theme.colors.textMuted}
              />
            </Pressable>
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Pressable
            onPress={onSubmit}
            disabled={isSubmitting}
            style={({ pressed }) => [
              styles.primaryAction,
              (pressed || isSubmitting) && styles.pressed,
              isSubmitting && styles.primaryActionDisabled
            ]}
            accessibilityRole="button"
            accessibilityLabel="Entrar"
          >
            <Text style={styles.primaryActionLabel}>
              {isSubmitting ? "Entrando…" : "Entrar"}
            </Text>
          </Pressable>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Ao continuar, você aceita nossa{" "}
              <Text
                style={styles.footerLink}
                onPress={() => void WebBrowser.openBrowserAsync(PRIVACY_URL)}
              >
                Política de Privacidade
              </Text>{" "}
              e os{" "}
              <Text
                style={styles.footerLink}
                onPress={() => void WebBrowser.openBrowserAsync(TERMS_URL)}
              >
                Termos de Uso
              </Text>
              .
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};
