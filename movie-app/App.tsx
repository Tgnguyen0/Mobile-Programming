import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator, Alert, FlatList, RefreshControl,
  StyleSheet, Switch, Text, View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MovieCard, { Movie } from './components/MovieCard';

const API_URL = 'https://6832b4edc3f2222a8cb33089.mockapi.io/api/v1/movies'; // đổi thành API của bạn

function MovieScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isTile, setIsTile] = useState(false);

  const fetchMovies = useCallback(async() => {
    try {
      const res = await fetch(API_URL);
      const data: Movie[] = await res.json();
      setMovies(data);
    } catch (e) {
      Alert.alert('Lỗi', 'Không tải được dữ liệu' + e);
    }
  }, [])

  useEffect(() => {
    fetchMovies().finally(() => setLoading(false));
  }, [fetchMovies]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchMovies();
    setRefreshing(false);
  }, [fetchMovies]);

  const handleSelect = useCallback(
    (id: string) => {
      const m = movies.find((x) => x.id === id);
      if (m) Alert.alert('Phim đã chọn', m.title);
    },
    [movies]
  );

  const numColumns = isTile ? 2 : 1;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Movie App</Text>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Dạng lưới</Text>
          <Switch value={isTile} onValueChange={setIsTile} />
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : (
        <FlatList
          key={String(numColumns)}
          data={movies}
          keyExtractor={(item) => String(item.id)}
          numColumns={numColumns}
          columnWrapperStyle={isTile ? styles.columnWrapper : undefined}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              layout={isTile ? 'tile' : 'row'}
              onSelect={handleSelect}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <MovieScreen />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', padding: 16, backgroundColor: '#fff',
  },
  title: { fontSize: 22, fontWeight: 'bold' },
  switchRow: { flexDirection: 'row', alignItems: 'center' },
  switchLabel: { marginRight: 8 },
  loader: { marginTop: 40 },
  list: { padding: 12 },
  columnWrapper: { justifyContent: 'space-between' },
});