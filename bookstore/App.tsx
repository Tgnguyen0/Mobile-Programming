import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import AppHeader from './components/AppHeader';
import CategoryChips from './components/CategoryChips';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <AppHeader />
      </SafeAreaView>

      {/* Category Chips */}
      <CategoryChips />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  safeArea: {
    backgroundColor: '#1E2A5A',
  },
});