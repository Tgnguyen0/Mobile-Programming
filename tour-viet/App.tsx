import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import TourItem, { Tour } from './components/TourItem';
import { formatDate, formatPrice, groupByCity } from './utils/Tour';

// TODO: thay bằng URL mockapi.io của bạn (resource: tours)
const API_URL = 'https://6832b4edc3f2222a8cb33089.mockapi.io/api/v1/tour';

// TODO: thay bằng MSSV – Họ tên của bạn
const STUDENT = '22695891 – Nguyễn Nhật Tấn';

function Main() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');

  const fetchTours = useCallback(async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('GET failed');
      setTours(await res.json());
    } catch {
      Alert.alert('Lỗi', 'Không tải được danh sách tour');
    }
  }, []);

  useEffect(() => {
    fetchTours().finally(() => setLoading(false));
  }, [fetchTours]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchTours(); // search giữ nguyên
    setRefreshing(false);
  }, [fetchTours]);

  const handlePress = useCallback((t: Tour) => {
    Alert.alert(
      t.name,
      `Khởi hành: ${formatDate(t.departure)}\nSố ngày: ${t.days}\nGiá: ${formatPrice(t.price)}`
    );
  }, []);

  const handleToggleFavorite = useCallback(async (id: string, next: boolean) => {
    const apply = (value: boolean) =>
      setTours((prev) => prev.map((t) => (t.id === id ? { ...t, isFavorite: value } : t)));

    apply(next); // cập nhật lạc quan
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFavorite: next }),
      });
      if (!res.ok) throw new Error('PUT failed');
    } catch {
      apply(!next); // hoàn tác
      Alert.alert('Lỗi', 'Không cập nhật được yêu thích, vui lòng thử lại');
    }
  }, []);

  const sections = useMemo(() => {
    const kw = search.trim().toLowerCase();
    const filtered = kw ? tours.filter((t) => t.name.toLowerCase().includes(kw)) : tours;
    return groupByCity(filtered);
  }, [tours, search]);

  const favorites = useMemo(() => tours.filter((t) => t.isFavorite), [tours]);

  const renderHeader = () => (
    <View style={styles.favBox}>
      <Text style={styles.favTitle}>{`Tour yêu thích (${favorites.length})`}</Text>
      {favorites.length === 0 ? (
        <Text style={styles.empty}>Chưa có tour yêu thích</Text>
      ) : (
        <FlatList
          data={favorites}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 4 }}
          renderItem={({ item }) => (
            <TourItem
              tour={item}
              compact
              onPress={handlePress}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
        />
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tour Việt</Text>
        <Text style={styles.student}>{STUDENT}</Text>
        <TextInput
          style={styles.input}
          placeholder="Tìm tour theo tên..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 40 }} />
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          stickySectionHeadersEnabled
          ListHeaderComponent={renderHeader}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeader}>
              {`${section.title} · ${section.data.length} tour`}
            </Text>
          )}
          renderItem={({ item }) => (
            <TourItem
              tour={item}
              onPress={handlePress}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>Không tìm thấy tour phù hợp</Text>
          }
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <Main />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f4f7' },
  header: { padding: 12, backgroundColor: '#0a7ea4' },
  title: { fontSize: 22, fontWeight: '700', color: '#fff' },
  student: { fontSize: 13, color: '#e6f4f9', marginBottom: 8 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  favBox: { paddingVertical: 8 },
  favTitle: { fontSize: 16, fontWeight: '700', marginHorizontal: 12, marginBottom: 6 },
  sectionHeader: {
    fontSize: 15,
    fontWeight: '700',
    backgroundColor: '#dfe7ee',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  empty: { textAlign: 'center', color: '#777', padding: 16 },
});