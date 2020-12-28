import React, { useRef, useEffect } from 'react';
import {
  StyleSheet,
  Dimensions,
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import Colors from '../colors';

interface ProgressProps {
  progress: number,

};

function Progress({
  progress,
}: ProgressProps) {
  const progressBarRef = useRef(null);
  const { width } = Dimensions.get('window');

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

const styles = StyleSheet.create({
  progressBar: {
    height: 6,
    backgroundColor: Colors.white,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
  },
});

export default Progress;
