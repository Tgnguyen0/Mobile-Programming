import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import Level1 from './components/Level1';
import Level2 from './components/Level2';
import Level3 from './components/Level3';

const TABS = [
  { key: 1, label: 'Level 1', Comp: Level1 },
  { key: 2, label: 'Level 2', Comp: Level2 },
  { key: 3, label: 'Level 3', Comp: Level3 },
];

export default function App() {
  const [tab, setTab] = useState(3);
  const Current = TABS.find((t) => t.key === tab)!.Comp;

  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <StatusBar barStyle="dark-content" />
        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderColor: '#e5e7eb',
            marginTop: 24,
          }}
        >
          {TABS.map((t) => (
            <TouchableOpacity
              key={t.key}
              onPress={() => setTab(t.key)}
              style={{
                flex: 1,
                padding: 12,
                alignItems: 'center',
                borderBottomWidth: 2,
                borderColor: tab === t.key ? '#2563eb' : 'transparent',
              }}
            >
              <Text
                style={{
                  fontWeight: '600',
                  color: tab === t.key ? '#2563eb' : '#6b7280',
                }}
              >
                {t.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Current />
      </SafeAreaView>
    </Provider>
  );
}
