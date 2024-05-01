import React, { useEffect } from 'react';
import { Pressable } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

import {
	Directions,
	Gesture,
	GestureDetector,
} from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { pad } from '../../utils';
import styles, {
	ListImage,
	Container,
	ChapterTitle,
	InfoContainer,
	ChapterNumber,
} from './styles';
import { FooterProps } from './types';

const listImage = require('../../../assets/list.png');
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function Footer({
	index,
	title,
	isVisible,
	showChapters,
	onChapterChanged,
}: FooterProps) {
	const insets = useSafeAreaInsets();
	const scale = useSharedValue(1);
	const translateY = useSharedValue(0);

	useEffect(() => {
		translateY.value = isVisible ? 0 : 120;
	}, [isVisible]);

	const pressInAnimation = () => {
		scale.value = 1.03;
	};

	const pressOutAnimation = () => {
		scale.value = 1;
	};

	const flingGestureLeft = Gesture.Fling()
		.direction(Directions.LEFT)
		.onEnd((e) => {
			onChapterChanged(index - 1);
		});

	const flingGestureRight = Gesture.Fling()
		.direction(Directions.RIGHT)
		.onEnd((e) => {
			onChapterChanged(index + 1);
		});

	const aes = useAnimatedStyle(() => ({
		transform: [
			{ translateY: withSpring(translateY.value) },
			{ scale: withSpring(scale.value) },
		],
	}));

	const composed = Gesture.Simultaneous(flingGestureLeft, flingGestureRight);

	return (
		<GestureDetector gesture={composed}>
			<AnimatedPressable
				onPress={() => showChapters(true)}
				onPressIn={pressInAnimation}
				onPressOut={pressOutAnimation}
				style={[
					aes,
					styles.animatedContainer,
					{
						bottom: insets.bottom + 10,
					},
				]}
			>
				<Container>
					<ListImage source={listImage} />
					<InfoContainer>
						<ChapterNumber numberOfLines={2}>
							{pad(index.toString(), 3)}
						</ChapterNumber>
						<ChapterTitle numberOfLines={1}>{title}</ChapterTitle>
					</InfoContainer>
				</Container>
			</AnimatedPressable>
		</GestureDetector>
	);
}

export default Footer;
