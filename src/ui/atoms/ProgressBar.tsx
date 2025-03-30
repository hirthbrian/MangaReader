import { useCallback, useEffect, useMemo, useState } from 'react';
import { type LayoutChangeEvent, StyleSheet, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

import { useTheme } from '~infrastructure/hooks/useTheme';
import { TextSubheading } from '~ui/atoms/Texts';

const styles = StyleSheet.create({
	container: {
		gap: 10,
		flexDirection: 'row',
		alignItems: 'center',
	},
	barOuterContainer: {
		flex: 1,
		height: 4,
		borderRadius: 4,
	},
	barInnerContainer: {
		height: 4,
		borderRadius: 4,
	},
});

export interface Props {
	index: number;
	total: number;
	width?: number;
}

function ProgressBar({ index, total }: Props) {
	const { colors } = useTheme();
	const offset = useSharedValue(0);
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
			<View
				onLayout={onLayout}
				style={[
					styles.barOuterContainer,
					{ backgroundColor: colors.backgroundDark },
				]}
			>
				<Animated.View
					style={[
						aes,
						styles.barInnerContainer,
						{
							backgroundColor: colors.primary,
						},
					]}
				/>
			</View>
			<TextSubheading>{`${index + 1}/${total}`}</TextSubheading>
		</View>
	);
}

export default ProgressBar;
