import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import useAnalyticsTracking from './hooks/useAnalyticsTracking';
import RootNavigation from './utils/RootNavigation';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';

import { StackParamList } from './types';

// Pages
import Dashboard from './pages/Dashboard';


const Tab = createBottomTabNavigator();

const Stack = createStackNavigator<StackParamList>();

export default function StackRoutes() {
  const { navigationRef } = useAnalyticsTracking();
  RootNavigation.init(navigationRef);


  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={Dashboard} screenOptions={{headerShown: false}}>
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
