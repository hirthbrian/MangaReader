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
  const translate = useRef(new Animated.ValueXY()).current;

  const onPinchEvent = Animated.event(
    [{ nativeEvent: { scale } }],
    { useNativeDriver: true }
  );

  const onPanGestureEvent = Animated.event([{
    nativeEvent: {
      translationX: translate.x,
      translationY: translate.y,
    }
  }], { useNativeDriver: true });

  const onPanStateChange = (event: HandlerStateChangeEvent<PanGestureHandlerEventPayload>) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(translate.x, { toValue: 0, useNativeDriver: true }).start();
      Animated.spring(translate.y, { toValue: 0, useNativeDriver: true }).start();
    }
  };

  const onPinchStateChange = (event: HandlerStateChangeEvent<PinchGestureHandlerEventPayload>) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start()
    }
  };

  return (
    <Container
      width={width}
      height={height}
    >
      <Pressable onPress={onPress}>
        <PinchGestureHandler
          ref={pinchRef}
          simultaneousHandlers={panRef}
          onGestureEvent={onPinchEvent}
          onHandlerStateChange={onPinchStateChange}
        >
          <Animated.View>
            <PanGestureHandler
              ref={panRef}
              simultaneousHandlers={pinchRef}
              minPointers={2}
              onGestureEvent={onPanGestureEvent}
              onHandlerStateChange={onPanStateChange}
            >
              <Animated.Image
                source={{ uri }}
                resizeMode='contain'
                style={{
                  width,
                  height,
                  transform: [
                    {
                      scale: scale.interpolate({
                        inputRange: [0, 1, 3, 100],
                        outputRange: [0.5, 1, 3, 10]
                      })
                    },
                    { translateX: translate.x },
                    { translateY: translate.y },
                  ]
                }}
              />
            </PanGestureHandler>
          </Animated.View>
        </PinchGestureHandler>
      </Pressable>
    </Container>
  );
}

export default Page;
