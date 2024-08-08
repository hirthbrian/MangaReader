import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import RegularText from '../atoms/Texts/RegularText';
import ChapterSelectedIndicator from '../atoms/ChapterSelectedIndicator';
import { pad } from '../../infrastructure/utils';
import SemiBoldText from '../atoms/Texts/SemiBoldText';
import { FontSizeEnum } from '../atoms/Texts/TextBase';
import Animated from 'react-native-reanimated';
import AnimatedPressable from '../atoms/AnimatedPressable';
import ColorsEnum from '../../domain/enum/ColorsEnum';

type ChapterRowItemProps = {
	date: string;
	index: number;
	isChapterSelected: boolean;
	name: string;
	onPress?: () => void;
};

function ChapterRowItem({
	date,
	index,
	isChapterSelected,
	name,
	onPress,
}: ChapterRowItemProps) {
	const chapterNumber = useMemo(() => pad(index.toString(), 3), [index]);

	return (
		<AnimatedPressable onPress={onPress}>
			{({ scale, backgroundColor }) => (
				<Animated.View
					style={[
						styles.container,
						{
							transform: [{ scale }],
							backgroundColor: isChapterSelected
								? ColorsEnum.PRIMARY
								: backgroundColor,
						},
					]}
				>
					<View style={{ gap: 4 }}>
						<RegularText>
							<SemiBoldText>{chapterNumber}</SemiBoldText>: {name}
						</RegularText>
						<RegularText fontSize={FontSizeEnum.SMALL}>{date}</RegularText>
					</View>
				</Animated.View>
			)}
		</AnimatedPressable>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingHorizontal: 15,
		padding: 10,
		borderRadius: 15,
	},
	itemContainer: {
		flex: 1,
		flexDirection: 'row',
	},
});

export default ChapterRowItem;
