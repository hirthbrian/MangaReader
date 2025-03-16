import { StyleSheet, View } from 'react-native';

import { TreeIndicatorType } from '~domain/types';
import { useTheme } from '~infrastructure/hooks/useTheme';

const styles = StyleSheet.create({
	container: {
		width: 10,
		flexDirection: 'row',
	},
	startVerticalLine: {
		width: 3,
		borderTopLeftRadius: 2,
		borderTopRightRadius: 2,
	},
	middleVerticalLine: {
		width: 3,
	},
	endVerticalLine: {
		width: 3,
		height: 9,
		borderRadius: 2,
		borderBottomRightRadius: 0,
	},
	horizontalLine: {
		flex: 1,
		height: 3,
		top: 6,
		borderTopRightRadius: 2,
		borderBottomRightRadius: 2,
	},
});

type Props = {
	type: TreeIndicatorType;
};

function TreeIndicator({ type }: Props) {
	const { colors } = useTheme();

	const renderStartIndicator = () => {
		return (
			<View style={styles.container}>
				<View
					style={[
						styles.startVerticalLine,
						{
							backgroundColor: colors.neutral,
						},
					]}
				/>
				<View
					style={[
						styles.horizontalLine,
						{
							backgroundColor: colors.neutral,
						},
					]}
				/>
			</View>
		);
	};

	const renderMiddleIndicator = () => {
		return (
			<View style={styles.container}>
				<View
					style={[
						styles.middleVerticalLine,
						{
							backgroundColor: colors.neutral,
						},
					]}
				/>
				<View
					style={[
						styles.horizontalLine,
						{
							backgroundColor: colors.neutral,
						},
					]}
				/>
			</View>
		);
	};

	const renderEndIndicator = () => {
		return (
			<View style={styles.container}>
				<View
					style={[
						styles.endVerticalLine,
						{
							backgroundColor: colors.neutral,
						},
					]}
				/>
				<View
					style={[
						styles.horizontalLine,
						{
							backgroundColor: colors.neutral,
						},
					]}
				/>
			</View>
		);
	};

	if (type === 'start') {
		return renderStartIndicator();
	}
	if (type === 'middle') {
		return renderMiddleIndicator();
	}
	if (type === 'end') {
		return renderEndIndicator();
	}
	return null;
}

export default TreeIndicator;
