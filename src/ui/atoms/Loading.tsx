import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { useTheme } from '~infrastructure/hooks/useTheme';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

function Loading() {
	const { colors } = useTheme();
	return (
		<View style={[styles.container, { backgroundColor: colors.background }]}>
			<ActivityIndicator size="large" color={colors.primary} />
		</View>
	);
}

export default Loading;
