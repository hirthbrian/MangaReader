import { forwardRef, type ReactElement } from 'react';
import {
	StyleSheet,
	TextInput as TextInputNative,
	type TextInputProps,
	View,
} from 'react-native';

import { useTheme } from '~infrastructure/hooks/useTheme';

const styles = StyleSheet.create({
	container: {
		padding: 10,
		borderRadius: 8,
		flexDirection: 'row',
		gap: 10,
		justifyContent: 'space-between',
	},
	textInput: {
		flex: 1,
		fontSize: 18,
		fontFamily: 'LeagueSpartan-Regular',
		fontWeight: 400,
		lineHeight: 18,
	},
});

interface Props extends TextInputProps {
	LeftElement?: () => ReactElement | null;
	RightElement?: () => ReactElement | null;
}

const TextInput = forwardRef(function TextInput(
	{ LeftElement, RightElement, ...props }: Props,
	ref: React.ForwardedRef<TextInputNative>,
) {
	const { colors } = useTheme();
	return (
		<View
			style={[styles.container, { backgroundColor: colors.backgroundLight }]}
		>
			{LeftElement && <LeftElement />}
			<TextInputNative
				ref={ref}
				{...props}
				placeholderTextColor={colors.neutralLight}
				style={[styles.textInput, { color: colors.neutral }]}
			/>
			{RightElement && <RightElement />}
		</View>
	);
});

export default TextInput;
