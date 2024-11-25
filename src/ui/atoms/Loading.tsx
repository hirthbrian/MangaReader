import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import ColorsEnum from '../../domain/enum/ColorsEnum';

function Loading() {
	return (
		<View style={styles.container}>
			<ActivityIndicator size="large" color={ColorsEnum.PRIMARY} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: ColorsEnum.BACKGROUND,
	},
});

export default Loading;
