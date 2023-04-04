import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type StackParamList = {
  Dashboard: undefined;
};

export interface DefaultStackNavigationProps<T extends keyof StackParamList> {
  navigation: StackNavigationProp<StackParamList, T>;
  route: RouteProp<StackParamList, T>;
}
