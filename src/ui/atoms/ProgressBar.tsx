import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { LayoutChangeEvent, Pressable, StyleSheet, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import ColorsEnum from '../../domain/enum/ColorsEnum';
import SemiBoldText from '../atoms/Texts/SemiBoldText';
import RegularText from './Texts/RegularText';
import { useNavigation } from '@react-navigation/native';

export interface Props {
	index: number;
	total: number;
	width?: number;
}

function ProgressBar({ index, total }: Props) {
	const offset = useSharedValue(0);
	const navigation = useNavigation();
	const [barWidth, setBarWidth] = useState(1);

	const progress = useMemo(() => index / (total - 1), [index, total]);

	useEffect(() => {
		offset.value = withTiming(progress);
	}, [offset, progress]);

	const onLayout = useCallback(
		({ nativeEvent: { layout } }: LayoutChangeEvent) => {
			setBarWidth(layout.width);
		},
		[],
	);

	const aes = useAnimatedStyle(() => ({ width: offset.value * barWidth }));

	return (
		<View style={styles.container}>
			<View onLayout={onLayout} style={styles.barOuterContainer}>
				<Animated.View style={[aes, styles.barInnerContainer]} />
			</View>
			<View style={{ width: 50 }}>
				<SemiBoldText textAlign="right">{`${index + 1}/${total}`}</SemiBoldText>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: ColorsEnum.BACKGROUND,
	},
	barOuterContainer: {
		flex: 1,
		height: 4,
		borderRadius: 4,
		backgroundColor: ColorsEnum.FOREGROUND,
	},
	barInnerContainer: {
		height: 4,
		// width: 200,
		borderRadius: 4,
		backgroundColor: ColorsEnum.PRIMARY,
	},
});

export default ProgressBar;
