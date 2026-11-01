import React, { useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import WelcomeScreen from './components/WelcomeScreen';
import ListScreen from './components/ListScreen';
import DetailScreen from './components/DetailScreen';
import { Bike } from './data/bike.js';

type Route =
  | { name: 'welcome' }
  | { name: 'list' }
  | { name: 'detail'; bike: Bike };

export default function App() {
  const [route, setRoute] = useState<Route>({ name: 'welcome' });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" />
      {route.name === 'welcome' && (
        <WelcomeScreen onStart={() => setRoute({ name: 'list' })} />
      )}
      {route.name === 'list' && (
        <ListScreen onSelect={(bike) => setRoute({ name: 'detail', bike })} />
      )}
      {route.name === 'detail' && (
        <DetailScreen bike={route.bike} onBack={() => setRoute({ name: 'list' })} />
      )}
    </SafeAreaView>
  );
}