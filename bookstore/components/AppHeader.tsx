import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AppHeader() {
  return (
    <View style={styles.header}>
      {/* Logo / tên app */}
      <Text style={styles.logo}>BookStore</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons
            name="search-outline"
            size={24}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton}>
          <Ionicons
            name="cart-outline"
            size={24}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    paddingHorizontal: 16,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: '#1E2A5A',
  },

  logo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  iconButton: {
    padding: 4,
  },
});