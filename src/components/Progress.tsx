import React, { useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

import styled from 'styled-components';
import Animated from 'react-native-reanimated';

import Colors from '../colors';

export const ProgressBar = styled(Animated.View)`
	height: 2px;
	background-color: ${Colors.blue};
`;

export interface Props {
	progress: number;
}

function Progress({ progress }: Props) {
	const { width } = useWindowDimensions();
	const offset = useSharedValue(0);

	useEffect(() => {
		offset.value = withTiming(progress * width);
	}, [progress]);

	const aes = useAnimatedStyle(() => ({ width: offset.value }));

	return <ProgressBar style={aes} />;
}

export default Progress;
