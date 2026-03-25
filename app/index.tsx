import { Redirect } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

export default function Index() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return <Redirect href="/(tabs)" />;
}
