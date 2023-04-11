import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import styles from './styles';

function Dashboard(): JSX.Element {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text style={{color: 'white'}}>Essa é a Página de Dashboard</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Dashboard;
