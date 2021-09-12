import React, { useRef, useEffect } from 'react';
import { useWindowDimensions } from 'react-native';

import * as Animatable from 'react-native-animatable';

import styles from './styles';
import { ProgressProps } from './types';

function Progress({ progress }: ProgressProps) {
  const progressBarRef = useRef(null);
  const { width } = useWindowDimensions();

  useEffect(() => {
    progressBarRef?.current?.transitionTo({ width: progress * width });
  }, [progress])

  return (
    <Animatable.View
      ref={progressBarRef}
      easing='linear'
      style={styles.progressBar}
    />
  );
}

export default Progress;
