import React, { useEffect } from 'react';
import { Image, Pressable, View, StyleSheet } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface FooterProps {
	currentPage: number;
	currentIndex: number;
	index: number;
	title: string;
	totalPages: number;
}

const closeIcon = require('../../../assets/close.png');
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

import { useNavigation } from '@react-navigation/native';
import ColorsEnum from '../../domain/enum/ColorsEnum';
import { pad } from '../../infrastructure/utils';
import ProgressBar from '../atoms/ProgressBar';
import SemiBoldText from '../atoms/Texts/SemiBoldText';

function Footer({ currentPage, index, title, totalPages }: FooterProps) {
	const navigation = useNavigation();
	const insets = useSafeAreaInsets();

	const openChapter = () => navigation.navigate('ChapterList');

	return (
		<AnimatedPressable
			style={[
				styles.animatedContainer,
				{
					paddingBottom: insets.bottom + 10,
				},
			]}
		>
			<View style={styles.container}>
				{/* <Pressable onPress={openChapter}>
					<Image style={styles.listImage} source={closeIcon} />
				</Pressable> */}
				{/* <View style={styles.infoContainer}>
					<SemiBoldText
						textAlign="center"
						color={ColorsEnum.WHITE}
						numberOfLines={1}
					>
						{`${pad(index.toString(), 3)}: ${title}`}
					</SemiBoldText> */}
				<SemiBoldText textAlign="center">
					{`${pad(index.toString(), 3)}: ${title}`}
				</SemiBoldText>
				<ProgressBar index={currentPage} total={totalPages} />
				{/* </View> */}
				{/* <View style={styles.listImage} /> */}
			</View>
		</AnimatedPressable>
	);
}

const styles = StyleSheet.create({
	animatedContainer: {
		left: 0,
		right: 0,
		bottom: 0,
		position: 'absolute',
		backgroundColor: ColorsEnum.BACKGROUND,
		maxWidth: 500,
	},
	listImage: {
		width: 20,
		height: 20,
		tintColor: ColorsEnum.TEXT,
	},
	infoContainer: {
		flex: 1,
		gap: 5,
		alignItems: 'center',
		paddingHorizontal: 15,
	},
	container: {
		flex: 1,
		alignItems: 'center',
		gap: 10,
		// flexDirection: 'row',
		padding: 15,
	},
});

export default Footer;
