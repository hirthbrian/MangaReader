import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import SemiBoldText from '../atoms/Texts/SemiBoldText';
import Animated from 'react-native-reanimated';

import AnimatedPressable from '../atoms/AnimatedPressable';
import ColorsEnum from '../../domain/enum/ColorsEnum';

type MangaType = {
	banner?: string;
	onPress?: (mangaId: string) => void;
	title: string;
	width?: number;
};

function Manga({
	banner = 'https://picsum.photos/200',
	onPress,
	title,
}: MangaType) {
	return (
		<AnimatedPressable onPress={onPress}>
			{({ scale, backgroundColor }) => (
				<Animated.View
					style={{
						gap: 15,
						backgroundColor,
						transform: [{ scale }],
						borderRadius: 15,
						padding: 10,
						borderWidth: StyleSheet.hairlineWidth,
						borderColor: ColorsEnum.HIGHLIGHT,
					}}
				>
					<Image
						source={{ uri: banner }}
						style={{
							width: '100%',
							height: 200,
							borderRadius: 15,
						}}
					/>
					<SemiBoldText textAlign="center" numberOfLines={2} fontSize={20}>
						{title}
					</SemiBoldText>
				</Animated.View>
			)}
		</AnimatedPressable>
	);
}

const styles = StyleSheet.create({
	container: {},
});

export default Manga;
