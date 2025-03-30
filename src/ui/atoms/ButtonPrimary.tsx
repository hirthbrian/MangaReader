import {
	ActivityIndicator,
	type FlexAlignType,
	Pressable,
	StyleSheet,
} from 'react-native';
import Animated from 'react-native-reanimated';

import { colorPalettes } from '~domain/colors';
import { useTheme } from '~infrastructure/hooks/useTheme';
import { TextHeading } from '~ui/atoms/Texts';

const styles = StyleSheet.create({
	container: {
		gap: 10,
		padding: 10,
		borderRadius: 4,
		flexDirection: 'row',
		justifyContent: 'center',
	},
});

type Props = {
	alignSelf?: 'auto' | FlexAlignType | undefined;
	disabled?: boolean;
	loading?: boolean;
	onPress: () => void;
	title: string;
};

function ButtonPrimary({
	loading,
	disabled,
	alignSelf,
	onPress,
	title,
}: Props) {
	const { colors } = useTheme();

	const getBackgroundColor = (pressed: boolean) => {
		if (disabled) {
			return colors.backgroundDark;
		}
		if (pressed) {
			return colors.primaryDark;
		}
		return colors.primary;
	};

	const getOpacity = (pressed: boolean) => (pressed ? 0.5 : 1);

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
						<ActivityIndicator size={18} color={colors.background} />
					) : null}
					<TextHeading
						color={colorPalettes.light.background}
						textAlign="center"
						style={{
							opacity: getOpacity(pressed),
						}}
					>
						{title}
					</TextHeading>
				</Animated.View>
			)}
		</Pressable>
	);
}

export default ButtonPrimary;
