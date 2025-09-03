import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, Text, View, Pressable } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#0B0B0B' }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <Text style={{ color: '#D1FF3D', fontSize: 20 }}>thecueRoom — Mobile/Web (Safe Boot)</Text>
          <LazyShell />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

function LazyShell() {
  const [Comp, setComp] = React.useState<React.ComponentType | null>(null);
  const [err, setErr] = React.useState<string | null>(null);

  const load = async () => {
    try {
      const mod = await import('./app/RootNavigator'); // 👉 point this to your real entry later
      setComp(() => (mod.default ?? (mod as any).RootNavigator));
    } catch (e: any) {
      setErr(String(e?.message || e));
    }
  };

  return (
    <View style={{ alignItems: 'center', gap: 10 }}>
      {!Comp && !err && (
        <Pressable onPress={load} style={{ padding: 10, backgroundColor: '#222', borderRadius: 8 }}>
          <Text style={{ color: '#fff' }}>Load App Shell</Text>
        </Pressable>
      )}
      {err && <Text style={{ color: '#FF6666', paddingHorizontal: 16, textAlign: 'center' }}>{err}</Text>}
      {Comp ? <Comp /> : null}
    </View>
  );
}
