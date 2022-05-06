import styled from 'styled-components/native';
import { Pressable } from 'react-native';
import Animated from 'react-native-reanimated';

import { ContainerProps } from './types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Container = styled(AnimatedPressable)`
  width: ${(props: ContainerProps) => props.width}px;
  height: ${(props: ContainerProps) => props.height}px;
`;
