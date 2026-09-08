import { StyleSheet, Text, View } from 'react-native';

const categories = [
  'Văn học',
  'Kinh tế',
  'Thiếu nhi',
  'Kỹ năng sống',
  'Truyện tranh',
  'Công nghệ',
  'Tâm lý',
  'Lịch sử',
];

export default function CategoryChips() {
  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <View key={category} style={styles.chip}>
          <Text style={styles.text}>{category}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,

    padding: 16,

    // Thử xóa dòng này để so sánh
    alignContent: 'flex-start',
  },

  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,

    borderRadius: 999,

    borderWidth: 1,
    borderColor: '#1E2A5A',

    backgroundColor: '#FFFFFF',
  },

  text: {
    fontSize: 14,
    color: '#1E2A5A',
    fontWeight: '500',
  },
});