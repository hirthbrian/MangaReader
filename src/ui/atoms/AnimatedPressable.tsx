import React, { ReactNode } from 'react';

import ColorsEnum from '../../domain/enum/ColorsEnum';
import {
	SharedValue,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { Pressable } from 'react-native';

type MangaType = {
	children: ({
		scale,
		backgroundColor,
	}: {
		scale: SharedValue<number>;
		backgroundColor: SharedValue<ColorsEnum>;
	}) => ReactNode;
	onPress?: (mangaId: string) => void;
};

function AnimatedPressable({ children, onPress }: MangaType) {
	const scale = useSharedValue(1);
	const backgroundColor = useSharedValue(ColorsEnum.FOREGROUND);

	const handlePressOut = () => {
		scale.value = withTiming(1);
		backgroundColor.value = withTiming(ColorsEnum.FOREGROUND);
	};

	const handlePressIn = () => {
		scale.value = withTiming(0.98);
		backgroundColor.value = withTiming(ColorsEnum.HIGHLIGHT);
		setTimeout(handlePressOut, 500);
	};

	return (
		<Pressable
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			onPress={onPress}
		>
			{children({ scale, backgroundColor })}
		</Pressable>
	);
}

export default AnimatedPressable;
