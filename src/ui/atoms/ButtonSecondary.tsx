import {
	ActivityIndicator,
	type FlexAlignType,
	Pressable,
	StyleSheet,
} from 'react-native';
import Animated from 'react-native-reanimated';

import { useTheme } from '~infrastructure/hooks/useTheme';
import { TextSubheading } from '~ui/atoms/Texts';

const styles = StyleSheet.create({
	container: {
		gap: 10,
		padding: 10,
		borderRadius: 4,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

type Props = {
	alignSelf?: 'auto' | FlexAlignType | undefined;
	loading?: boolean;
	onPress: () => void;
	title: string;
};

function ButtonSecondary({ loading, alignSelf, onPress, title }: Props) {
	const { colors } = useTheme();

	const getBackgroundColor = (pressed: boolean) => {
		if (pressed) {
			return colors.backgroundDark;
		}
		return undefined;
	};

	return (
		<Pressable onPress={onPress}>
			{({ pressed }) => (
				<Animated.View
					style={{
						alignSelf,
						backgroundColor: getBackgroundColor(pressed),
						...styles.container,
					}}
				>
					{loading ? (
						<ActivityIndicator size={14} color={colors.neutral} />
					) : null}
					<TextSubheading textAlign="center">{title}</TextSubheading>
				</Animated.View>
			)}
		</Pressable>
	);
}

export default ButtonSecondary;
