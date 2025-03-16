import { StyleSheet, View } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';

import { useTheme } from '~infrastructure/hooks/useTheme';
import ButtonPrimary from '~ui/atoms/ButtonPrimary';
import { IconPalette, IconSettings } from '~ui/atoms/Icons';
import { TextHeading } from '~ui/atoms/Texts';

const styles = StyleSheet.create({
	actionSheetContainer: {
		padding: 15,
		gap: 5,
	},
	container: {
		gap: 20,
	},
	section: {
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center',
	},
});

function ProfileActionSheet() {
	const { colors } = useTheme();

	return (
		<ActionSheet
			containerStyle={{
				backgroundColor: colors.background,
				...styles.actionSheetContainer,
			}}
		>
			<View style={styles.container}>
				<TextHeading textAlign="center">Guest</TextHeading>
				<View style={styles.section}>
					<IconSettings size={24} color={colors.neutral} />
					<TextHeading>Settings</TextHeading>
				</View>
				<View style={styles.section}>
					<IconPalette size={24} color={colors.neutral} />
					<TextHeading>Theme</TextHeading>
				</View>
				<ButtonPrimary title="Sign In" onPress={() => null} />
			</View>
		</ActionSheet>
	);
}

export default ProfileActionSheet;
