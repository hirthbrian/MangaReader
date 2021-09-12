import React, { useRef } from 'react';
import { Pressable, Animated, useWindowDimensions } from 'react-native';
import {
  State,
  PanGestureHandler,
  PinchGestureHandler,
  HandlerStateChangeEvent,
  PanGestureHandlerEventPayload,
  PinchGestureHandlerEventPayload,
} from 'react-native-gesture-handler'

import { Props } from './types';
import { Container } from './styles';

function Page({ uri, onPress }: Props) {
  const { width, height } = useWindowDimensions();
  const panRef = useRef(null);
  const pinchRef = useRef(null);
  const scale = useRef(new Animated.Value(1)).current;
  const focalX = useRef(new Animated.Value(width / 2)).current;
  const focalY = useRef(new Animated.Value(height / 2)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const onPanGestureEvent = Animated.event([{
    nativeEvent: {
      translationX: translateX,
      translationY: translateY,
    }
  }], { useNativeDriver: true });

  const onPinchEvent = Animated.event(
    [{ nativeEvent: { scale, focalX, focalY } }],
    { useNativeDriver: true }
  );

  const onPanStateChange = (event: HandlerStateChangeEvent<PanGestureHandlerEventPayload>) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(translateX, { toValue: 0, useNativeDriver: true }).start();
      Animated.spring(translateY, { toValue: 0, useNativeDriver: true }).start();
    }
  };

  const onPinchStateChange = (event: HandlerStateChangeEvent<PinchGestureHandlerEventPayload>) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
      Animated.spring(focalX, { toValue: width / 2, useNativeDriver: true }).start();
      Animated.spring(focalY, { toValue: height / 2, useNativeDriver: true }).start();
    }
  };

  const negativeInterpolation = (animatedValue: Animated.Value) =>
    animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -1],
    });

  const transformValues = () => [
    { translateX },
    { translateY },
    { translateX: focalX },
    { translateY: focalY },
    { translateX: -width / 2 },
    { translateY: -height / 2 },
    {
      scale: scale.interpolate({
        inputRange: [0, 1, 3, 10],
        outputRange: [0.8, 1, 3, 3]
      })
    },
    { translateX: negativeInterpolation(focalX) },
    { translateY: negativeInterpolation(focalY) },
    { translateX: width / 2 },
    { translateY: height / 2 },
  ]

  return (
    <Container
      width={width}
      height={height}
    >
      <Pressable onPress={onPress}>
        <PanGestureHandler
          ref={panRef}
          simultaneousHandlers={pinchRef}
          minPointers={2}
          onGestureEvent={onPanGestureEvent}
          onHandlerStateChange={onPanStateChange}
        >
          <Animated.View>
            <PinchGestureHandler
              ref={pinchRef}
              simultaneousHandlers={panRef}
              onGestureEvent={onPinchEvent}
              onHandlerStateChange={onPinchStateChange}
            >
              <Animated.Image
                source={{ uri }}
                resizeMode='contain'
                style={{
                  width,
                  height,
                  transform: transformValues(),
                }}
              />
            </PinchGestureHandler>
          </Animated.View>
        </PanGestureHandler>
      </Pressable>
    </Container>
  );
}

export default Page;
