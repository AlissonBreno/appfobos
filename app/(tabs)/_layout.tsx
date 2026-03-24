import { Tabs } from "expo-router";
import { ExpoRouterTabBar } from "@/components/FloatingBottomNav/ExpoRouterTabBar";

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <ExpoRouterTabBar {...props} />}
      screenOptions={{
        headerShown: false
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard"
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: "Transacoes"
        }}
      />
    </Tabs>
  );
}
