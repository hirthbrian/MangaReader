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

import { pad } from '../utils';

export interface FooterProps {
	index: number;
	title: string;
	isVisible: boolean;
	showChapters: Function;
	onChapterChanged: Function;
}

const listImage = require('../../assets/list.png');
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import Colors from '../colors';

export const Container = styled.View`
	align-items: center;
	flex-direction: row;
	padding: 10px 15px;
`;

export const InfoContainer = styled.View`
	flex: 1;
	padding-left: 15px;
`;

export const ChapterNumber = styled.Text`
	font-size: 16px;
	font-family: InterBlack;
	color: ${Colors.white};
`;

export const ChapterTitle = styled.Text`
	font-family: InterSemiBold;
	color: ${Colors.white};
`;

export const ListImage = styled.Image`
	width: 20px;
	height: 20px;
	tint-color: ${Colors.white};
`;

export const ProgresBar = styled.View`
	height: 3px;
	background-color: ${Colors.white};
`;
const styles = StyleSheet.create({
	animatedContainer: {
		left: 0,
		right: 0,
		bottom: 10,
		position: 'absolute',
		borderRadius: 10,
		marginHorizontal: 10,
		shadowColor: Colors.black,
		backgroundColor: Colors.darkBlue,
		shadowOffset: {
			width: 0,
			height: 6,
		},
		shadowOpacity: 0.37,
		shadowRadius: 7.49,
		maxWidth: 500,
	},
});

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
