import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { HERO_IMAGE } from '../data/bike.js';

const mono = Platform.OS === 'ios' ? 'Courier' : 'monospace';

export default function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <View style={s.container}>
      <View style={s.tagline}>
        <Text style={s.taglineText}>
          A premium online store for sporter and their stylish choice
        </Text>
      </View>

      <View style={s.heroBox}>
        <Image source={{ uri: HERO_IMAGE }} style={s.hero} resizeMode="contain" />
      </View>

      <Text style={s.title}>POWER BIKE{'\n'}SHOP</Text>

      <TouchableOpacity style={s.button} onPress={onStart}>
        <Text style={[s.buttonText, { fontFamily: mono }]}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f6f4', padding: 12, justifyContent: 'space-between' },
  tagline: { borderWidth: 2, borderColor: '#6b7399', padding: 8, marginTop: 30 },
  taglineText: { fontFamily: mono, textAlign: 'center', fontSize: 14, color: '#000' },
  heroBox: { backgroundColor: '#f6e3e3', borderRadius: 28, height: 280, justifyContent: 'center', alignItems: 'center' },
  hero: { width: '90%', height: '90%' },
  title: { textAlign: 'center', fontSize: 20, fontWeight: '800', letterSpacing: 0.5 },
  button: { backgroundColor: '#e84444', borderRadius: 24, paddingVertical: 12, alignItems: 'center', marginBottom: 10 },
  buttonText: { color: '#fff', fontSize: 15 },
});