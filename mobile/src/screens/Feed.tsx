import React from 'react';
import { View, Text, FlatList, Image, Pressable } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const posts = [
  { id: '1', type: 'text', content: 'Welcome to thecueRoom!' },
  { id: '2', type: 'image', content: 'https://placekitten.com/200/200' }
];

export default function Feed() {
  const scale = useSharedValue(1);
  const anim = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ padding: 16 }}>
          {item.type === 'text' ? (
            <Text style={{ color: 'white' }}>{item.content}</Text>
          ) : (
            <Image source={{ uri: item.content }} style={{ width: 200, height: 200 }} />
          )}
          <Pressable
            onPress={() => {
              scale.value = withSpring(1.4, {}, () => {
                scale.value = 1;
              });
            }}
          >
            <Animated.View
              style={[{ width: 20, height: 20, backgroundColor: '#D1FF3D', marginTop: 8 }, anim]}
            />
          </Pressable>
        </View>
      )}
    />
  );
}
