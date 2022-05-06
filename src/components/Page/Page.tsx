import React from 'react';
import { useWindowDimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import { Props } from './types';
import { Container } from './styles';

function Page({ uri, onPress }: Props) {
  const { width, height } = useWindowDimensions();
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const savedScale = useSharedValue(1);
  const start = useSharedValue({ x: 0, y: 0 });
  const offset = useSharedValue({ x: 0, y: 0 });

  const dragGesture = Gesture.Pan()
    .averageTouches(true)
    .onUpdate((e) => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      };
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
    });

  const zoomGesture = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = savedScale.value * event.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const composed = Gesture.Simultaneous(dragGesture, zoomGesture);

  const aes = useAnimatedStyle(() => ({
    transform: [
      { translateX: offset.value.x },
      { translateY: offset.value.y },
      { scale: scale.value },
      { rotateZ: `${rotation.value}rad` },
    ],
  }));

  return (
    <Container onPress={onPress} width={width} height={height}>
      <GestureDetector gesture={composed}>
        <Animated.Image
          source={{ uri }}
          resizeMode='contain'
          style={[aes, {
            width,
            height,
          }]}
        />
      </GestureDetector>
    </Container>
  );
}

export default Page;
