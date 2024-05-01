import React from 'react';
import { useWindowDimensions, Pressable, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface Props {
	uri: string;
	onPress: () => void;
}

export interface ContainerProps {
	width: number;
	height: number;
}

const Page = ({ uri, onPress }: Props) => {
	const { width, height } = useWindowDimensions();
	const scale = useSharedValue(1);
	const savedScale = useSharedValue(1);
	const start = useSharedValue({ x: 0, y: 0 });
	const offset = useSharedValue({ x: 0, y: 0 });

	const dragGesture = Gesture.Pan()
		.averageTouches(true)
		.onUpdate((e) => {
			offset.value = {
				x: e.translationX + start.value.x,
				y: e.translationY + start.value.y,
			};
		})
		.onEnd(() => {
			start.value = {
				x: offset.value.x,
				y: offset.value.y,
			};
		});

	const zoomGesture = Gesture.Pinch()
		.simultaneousWithExternalGesture(dragGesture)
		.onUpdate((event) => {
			if (
				savedScale.value * event.scale > 1 &&
				savedScale.value * event.scale < 2
			) {
				scale.value = savedScale.value * event.scale;
			}
		})
		.onEnd(() => {
			savedScale.value = scale.value;
		});

	const aes = useAnimatedStyle(() => ({
		transform: [
			{ translateX: offset.value.x },
			{ translateY: offset.value.y },
			{ scale: scale.value },
		],
	}));

	const composed = Gesture.Simultaneous(dragGesture, zoomGesture);

	return (
		// <GestureDetector gesture={composed}>
		<AnimatedPressable
			style={styles({ width, height }).container}
			onPress={onPress}
		>
			<Animated.Image
				source={{ uri: uri.replace(/\s/g, '') }}
				resizeMode="contain"
				style={[aes, { width, height }]}
			/>
		</AnimatedPressable>
		// </GestureDetector>
	);
};

type StyleSheetProps = {
	width?: number;
	height?: number;
};

const styles = ({ width, height }: StyleSheetProps) =>
	StyleSheet.create({
		container: {
			height,
			width,
		},
	});

export default Page;
