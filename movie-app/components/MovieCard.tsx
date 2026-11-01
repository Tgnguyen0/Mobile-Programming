import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type Movie = {
  id: string;
  title: string;
  genre: string;
  year: number;
  rating: number;
  poster: string;
  isShowing: boolean;
};

export type MovieCardProps = {
  movie: Movie;
  layout?: 'row' | 'tile';
  onSelect: (id: string) => void;
};

function MovieCard({ movie, layout = 'row', onSelect }: MovieCardProps) {
  const isTile = layout === 'tile';
  const ratingText = `⭐ ${movie.rating.toFixed(1)}`;
  const status = movie.isShowing ? '✅' : '❌';

  return (
    <TouchableOpacity
      style={[styles.card, isTile && styles.cardTile]}
      onPress={() => onSelect(movie.id)}
    >
      <View style={isTile ? undefined : styles.posterWrap}>
        <Image
          source={{ uri: movie.poster }}
          style={isTile ? styles.posterTile : styles.posterRow}
        />
        {isTile && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{ratingText}</Text>
          </View>
        )}
      </View>

      <View style={isTile ? styles.infoTile : styles.infoRow}>
        <Text style={styles.name} numberOfLines={isTile ? 1 : 2}>
          {movie.title}
        </Text>
        {!isTile && <Text style={styles.sub}>{movie.genre}</Text>}
        {!isTile && <Text style={styles.sub}>{String(movie.year)}</Text>}
        {!isTile && <Text style={styles.sub}>{ratingText}</Text>}
        <Text style={styles.status}>{status}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(MovieCard);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', backgroundColor: '#fff', borderRadius: 10,
    padding: 10, marginBottom: 12, elevation: 2,
  },
  cardTile: { flexDirection: 'column', width: '48%', padding: 0, overflow: 'hidden' },
  posterWrap: {},
  posterRow: { width: 70, height: 100, borderRadius: 6 },
  posterTile: { width: '100%', aspectRatio: 2 / 3 },
  badge: {
    position: 'absolute', top: 6, right: 6, backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6,
  },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  infoRow: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  infoTile: { padding: 8 },
  name: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  sub: { fontSize: 13, color: '#555', marginBottom: 2 },
  status: { fontSize: 14, marginTop: 2 },
});