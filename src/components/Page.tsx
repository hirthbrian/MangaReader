import React from 'react';
import {
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
  Animated,
} from 'react-native';

import { PinchGestureHandler, State } from 'react-native-gesture-handler'

interface PageProps {
  uri: string,
  onPress: () => void,
};

let scale = new Animated.Value(1);

function Page({ uri, onPress }: PageProps) {
  const { width, height } = Dimensions.get('window');

  const onPinchEvent = Animated.event(
    [{ nativeEvent: { scale } }],
    { useNativeDriver: true }
  );

  const onPinchStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true
      }).start()
    }
  };

  return (
    <Pressable
      onPress={onPress}
      style={styles.container}
    >
      <PinchGestureHandler
        onGestureEvent={onPinchEvent}
        onHandlerStateChange={onPinchStateChange}>
        <Animated.Image
          source={{ uri }}
          resizeMode='contain'
          style={{
            height,
            width,
            transform: [{ scale }]
          }}
        />
      </PinchGestureHandler>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Page;
