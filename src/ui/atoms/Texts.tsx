import {
	type ColorValue,
	type StyleProp,
	StyleSheet,
	Text,
	type TextProps,
	type TextStyle,
} from 'react-native';

import { useTheme } from '~infrastructure/hooks/useTheme';

export const textStyles = StyleSheet.create({
	title: {
		fontFamily: 'LeagueSpartan-Bold',
		fontWeight: 700,
		fontSize: 38,
		lineHeight: 42,
	},
	heading: {
		fontFamily: 'LeagueSpartan-SemiBold',
		fontWeight: 600,
		fontSize: 20,
		lineHeight: 24,
	},
	subheading: {
		fontFamily: 'LeagueSpartan-SemiBold',
		fontWeight: 600,
		fontSize: 14,
		lineHeight: 16,
	},
	body: {
		fontFamily: 'LeagueSpartan-Regular',
		fontWeight: 400,
		fontSize: 14,
		lineHeight: 18,
	},
});

export interface Props extends TextProps {
	color?: ColorValue;
	textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
	textStyle?: StyleProp<TextStyle>;
	uppercase?: boolean;
}

function TextBase({
	color,
	style,
	textAlign = 'auto',
	textStyle,
	uppercase,
	...props
}: Props) {
	const { colors } = useTheme();
	const textTransform = uppercase ? 'uppercase' : undefined;

	return (
		<Text
			style={[
				{
					textAlign,
					color: color || colors.neutral,
					textTransform,
				},
				textStyle,
				style,
			]}
			{...props}
		/>
	);
}

export const TextTitle = (props: Props) => (
	<TextBase {...props} textStyle={textStyles.title} />
);

export const TextHeading = (props: Props) => (
	<TextBase {...props} textStyle={textStyles.heading} />
);

export const TextSubheading = (props: Props) => (
	<TextBase {...props} textStyle={textStyles.subheading} />
);

export const TextBody = (props: Props) => (
	<TextBase {...props} textStyle={textStyles.body} />
);
