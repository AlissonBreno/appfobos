import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FloatingBottomNav } from ".";

type TabKey = "home" | "transactions";

const getTabKeyFromRoute = (routeName: string): TabKey => {
  if (routeName === "transactions") return "transactions";
  return "home";
};

const shouldHideFloatingNav = (state: BottomTabBarProps["state"]): boolean => {
  const activeTabRoute = state.routes[state.index];
  const routeName = activeTabRoute?.name;

  if (routeName !== "transactions") return false;

  const nestedState = activeTabRoute?.state;

  if (
    !nestedState ||
    typeof nestedState.index !== "number" ||
    !Array.isArray(nestedState.routes)
  ) {
    return false;
  }

  const nestedRoute = nestedState.routes[nestedState.index];
  return nestedRoute?.name !== "index";
};

export const ExpoRouterTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();
  const activeRoute = state.routes[state.index];
  const activeKey = getTabKeyFromRoute(activeRoute?.name ?? "index");
  const hideNav = shouldHideFloatingNav(state);

  if (hideNav) return null;

  return (
    <FloatingBottomNav
      active={activeKey}
      bottomInset={insets.bottom}
      onPress={(tabKey) => {
        if (!tabKey) return;

        if (tabKey === "home") {
          navigation.navigate("index");
          return;
        }

        navigation.navigate("transactions");
      }}
    />
  );
};
