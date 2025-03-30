import { useCallback } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SheetManager } from 'react-native-actions-sheet';

import { useTheme } from '~infrastructure/hooks/useTheme';
import { IconUser } from '~ui/atoms/Icons';

const styles = StyleSheet.create({
	container: {
		gap: 5,
		width: 32,
		height: 32,
		borderRadius: 32,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

function ProfileButton() {
	const { colors } = useTheme();

	// callbacks
	const handlePresentModalPress = useCallback(() => {
		SheetManager.show('profile');
	}, []);

	return (
		<Pressable onPress={handlePresentModalPress}>
			<View
				style={[
					styles.container,
					{
						backgroundColor: colors.backgroundLight,
					},
				]}
			>
				<IconUser size={28} color={colors.neutralLight} />
			</View>
		</Pressable>
	);
}

export default ProfileButton;
