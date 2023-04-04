import { RefObject } from 'react';
import { useNavigationContainerRef } from '@react-navigation/core';

export default function useAnalyticsTracking() {
  const routeNameRef = useNavigationContainerRef();
  const navigationRef = useNavigationContainerRef();

  function handleOnReady() {
    if (navigationRef && navigationRef.current) {
      routeNameRef.current = navigationRef?.current?.getCurrentRoute()?.name;
    }
  }

  function handleRouteChange() {
    if (!navigationRef || !navigationRef.current) return;
    const currentRouteName = navigationRef?.current?.getCurrentRoute()?.name;

    routeNameRef.current = currentRouteName;
  }

  return {
    navigationRef: navigationRef as RefObject<NavigationContainerRef>,
    handleOnReady,
    handleRouteChange,
  };
}
