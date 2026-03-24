import { Redirect } from "expo-router";
import { useAuth } from "@/features/auth/context/AuthContext";

export default function Index() {
  const { userId } = useAuth();

  if (userId === null) {
    return <Redirect href="/login" />;
  }

  return <Redirect href="/(tabs)" />;
}
