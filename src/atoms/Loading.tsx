import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import Colors from '../colors';

function Loading() {
	return (
		<View style={styles.container}>
			<ActivityIndicator size="large" color={Colors.blue} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.white,
	},
});

export default Loading;
