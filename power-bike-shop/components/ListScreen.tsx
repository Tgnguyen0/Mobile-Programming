import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { BIKES, Bike } from '../data/bike.js';

const TABS = ['All', 'Roadbike', 'Mountain'] as const;

export default function ListScreen({ onSelect }: { onSelect: (b: Bike) => void }) {
  const [tab, setTab] = useState<(typeof TABS)[number]>('All');
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const data = tab === 'All' ? BIKES : BIKES.filter((b) => b.category === tab);

  return (
    <View style={s.container}>
      <Text style={s.heading}>The world's Best Bike</Text>

      <View style={s.tabs}>
        {TABS.map((t) => (
          <TouchableOpacity
            key={t}
            style={[s.tab, tab === t && s.tabActive]}
            onPress={() => setTab(t)}
          >
            <Text style={[s.tabText, tab === t && s.tabTextActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={data}
        keyExtractor={(i) => i.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 10 }}
        contentContainerStyle={{ gap: 10, paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={s.card} onPress={() => onSelect(item)}>
            <TouchableOpacity
              style={s.heart}
              onPress={() => setLiked((p) => ({ ...p, [item.id]: !p[item.id] }))}
            >
              <Text style={{ fontSize: 16, color: liked[item.id] ? '#e84444' : '#aaa' }}>
                {liked[item.id] ? '♥' : '♡'}
              </Text>
            </TouchableOpacity>
            <Image source={{ uri: item.image }} style={s.img} resizeMode="contain" />
            <Text style={s.name}>{item.name}</Text>
            <Text style={s.price}>
              <Text style={{ color: '#f0a050' }}>$ </Text>
              {item.price}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 12 },
  heading: { color: '#e84444', fontSize: 18, fontWeight: '700', marginTop: 24, marginBottom: 16 },
  tabs: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  tab: { flex: 1, borderWidth: 1, borderColor: '#f3b4b4', borderRadius: 4, paddingVertical: 4, alignItems: 'center' },
  tabActive: { borderColor: '#e84444' },
  tabText: { color: '#bbb', fontSize: 12 },
  tabTextActive: { color: '#e84444' },
  card: { flex: 1, backgroundColor: '#fdf3ea', borderRadius: 10, padding: 8, alignItems: 'center' },
  heart: { position: 'absolute', top: 6, left: 8, zIndex: 1 },
  img: { width: '100%', height: 90, marginTop: 8 },
  name: { color: '#555', fontSize: 13, marginTop: 6 },
  price: { color: '#222', fontSize: 14, fontWeight: '600' },
});