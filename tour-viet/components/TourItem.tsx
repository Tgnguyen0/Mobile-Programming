import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { formatDate, formatPrice, getSeatLabel, Tour } from '../utils/Tour'

export type TourItemProps = {
  tour: Tour;
  compact?: boolean;
  onPress: (tour: Tour) => void;
  onToggleFavorite: (id: string, next: boolean) => void;
};

function TourItem({ tour, compact = false, onPress, onToggleFavorite }: TourItemProps) {
  const lowSeats = tour.seats <= 3;

  const heart = (
    <TouchableOpacity
      testID="fav-btn"
      onPress={() => onToggleFavorite(tour.id, !tour.isFavorite)}
      style={[styles.heartBtn, compact && styles.heartBtnCompact]}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <Text style={[styles.heart, tour.isFavorite && styles.heartOn]}>
        {tour.isFavorite ? '♥' : '♡'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.card, compact && styles.cardCompact]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onPress(tour)}
        style={[styles.press, compact && styles.pressCompact]}
      >
        <Image
          source={{ uri: tour.image }}
          style={[styles.image, compact && styles.imageCompact]}
        />
        <View style={[styles.info, compact && styles.infoCompact]}>
          <Text style={styles.name} numberOfLines={compact ? 1 : 2}>
            {tour.name}
          </Text>
          {!compact && <Text style={styles.city}>{tour.city}</Text>}
          {!compact && (
            <Text style={styles.meta}>
              {`📅 ${formatDate(tour.departure)} · ${tour.days} ngày`}
            </Text>
          )}
          <Text style={styles.price}>{formatPrice(tour.price)}</Text>
          {!compact && (
            <Text style={[styles.seats, lowSeats && styles.seatsLow]}>
              {getSeatLabel(tour.seats)}
            </Text>
          )}
        </View>
      </TouchableOpacity>
      {heart}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 8,
    marginHorizontal: 12,
    marginVertical: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardCompact: {
    width: 160,
    flexDirection: 'column',
    marginHorizontal: 0,
    marginVertical: 0,
    padding: 0,
    overflow: 'hidden',
  },
  press: { flex: 1, flexDirection: 'row' },
  pressCompact: { flexDirection: 'column' },
  image: { width: 90, height: 90, borderRadius: 8, backgroundColor: '#ddd' },
  imageCompact: { width: '100%', height: undefined, aspectRatio: 4 / 3, borderRadius: 0 },
  info: { flex: 1, marginLeft: 10, marginRight: 30, justifyContent: 'center' },
  infoCompact: { marginLeft: 0, marginRight: 0, padding: 8 },
  name: { fontSize: 15, fontWeight: '600', color: '#222' },
  city: { fontSize: 13, color: '#666', marginTop: 2 },
  meta: { fontSize: 12, color: '#444', marginTop: 2 },
  price: { fontSize: 14, fontWeight: '700', color: '#0a7ea4', marginTop: 2 },
  seats: { fontSize: 12, color: '#333', marginTop: 2 },
  seatsLow: { color: 'red' },
  heartBtn: { position: 'absolute', right: 8, top: 8 },
  heartBtnCompact: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 14,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    right: 6,
    top: 6,
  },
  heart: { fontSize: 22, color: '#888' },
  heartOn: { color: '#e0245e' },
});

export default React.memo(TourItem);