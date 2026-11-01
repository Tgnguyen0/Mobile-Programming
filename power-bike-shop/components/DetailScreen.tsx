import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Bike } from '../data/bike.js';

export default function DetailScreen({ bike, onBack }: { bike: Bike; onBack: () => void }) {
  const [liked, setLiked] = useState(false);
  const discounted = bike.price * 0.85;

  return (
    <View style={s.container}>
      <ScrollView contentContainerStyle={{ padding: 6 }}>
        <View style={s.imgBox}>
          <Image source={{ uri: bike.image }} style={s.img} resizeMode="contain" />
          <TouchableOpacity style={s.back} onPress={onBack}>
            <Text style={{ fontSize: 18 }}>‹</Text>
          </TouchableOpacity>
        </View>

        <Text style={s.title}>{bike.name}</Text>
        <View style={s.priceRow}>
          <Text style={s.off}>15% OFF | {discounted.toFixed(0)}$</Text>
          <Text style={s.old}>{bike.price}$</Text>
        </View>

        <Text style={s.descTitle}>Description</Text>
        <Text style={s.desc}>
          It is a very important form of writing as we write almost everything in
          paragraphs, be it an answer, essay, story, emails, etc.
        </Text>
      </ScrollView>

      <View style={s.footer}>
        <TouchableOpacity onPress={() => setLiked(!liked)}>
          <Text style={{ fontSize: 28, color: liked ? '#e84444' : '#000' }}>
            {liked ? '♥' : '♡'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.cta}>
          <Text style={s.ctaText}>Add to card</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  imgBox: { backgroundColor: '#fbeaea', borderRadius: 6, height: 260, justifyContent: 'center' },
  img: { width: '100%', height: '90%' },
  back: { position: 'absolute', top: 10, left: 10, backgroundColor: '#fff', width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '500', marginTop: 10 },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 20, marginTop: 4 },
  off: { color: '#555', fontSize: 15 },
  old: { fontSize: 16, fontWeight: '700' },
  descTitle: { fontSize: 16, fontWeight: '700', marginTop: 24 },
  desc: { color: '#666', fontSize: 14, lineHeight: 22, marginTop: 14 },
  footer: { flexDirection: 'row', alignItems: 'center', gap: 16, padding: 12 },
  cta: { flex: 1, backgroundColor: '#e84444', borderRadius: 22, paddingVertical: 12, alignItems: 'center' },
  ctaText: { color: '#fff', fontSize: 16 },
});