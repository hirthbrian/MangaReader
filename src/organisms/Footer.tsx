import React, { useEffect } from 'react';
import { Image, Pressable, Text, View, StyleSheet } from 'react-native';
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

import ChapterTitle from '../atoms/ChapterTitle';
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

import Colors from '../colors';
import { useNavigation } from '@react-navigation/native';

function Footer({
	index,
	title,
	isVisible,
	showChapters,
	onChapterChanged,
}: FooterProps) {
	const navigation = useNavigation();
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

	const openChapter = navigation.navigate('ChapterList');

	return (
		<GestureDetector gesture={composed}>
			<AnimatedPressable
				onPress={openChapter}
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
				<View style={styles.container}>
					<Image style={styles.listImage} source={listImage} />
					<View style={styles.infoContainer}>
						<Text style={styles.chapterNumber} numberOfLines={2}>
							{pad(index.toString(), 3)}
						</Text>
						<ChapterTitle color={Colors.white}>{title}</ChapterTitle>
					</View>
				</View>
			</AnimatedPressable>
		</GestureDetector>
	);
}

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
	listImage: {
		width: 20,
		height: 20,
		tintColor: Colors.white,
	},
	chapterNumber: {
		fontSize: 16,
		fontFamily: 'Inter-Black',
		color: Colors.white,
	},
	infoContainer: {
		flex: 1,
		paddingLeft: 15,
	},
	container: {
		alignItems: 'center',
		flexDirection: 'row',
		paddingVertical: 15,
		paddingHorizontal: 10,
	},
});

export default Footer;
