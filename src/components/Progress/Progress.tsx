import React, { useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { ProgressBar } from './styles';
import { Props } from './types';

function Progress({ progress }: Props) {
  const { width } = useWindowDimensions();
  const offset = useSharedValue(0);

  useEffect(() => {
    offset.value = withTiming(progress * width);
  }, [progress])

  const aes = useAnimatedStyle(() => ({ width: offset.value }));

  return <ProgressBar style={aes} />;
}

export default Progress;
