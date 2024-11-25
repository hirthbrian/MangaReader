import React from 'react';
import { StyleSheet, View } from 'react-native';
import ColorsEnum from '../../domain/enum/ColorsEnum';

function ChapterSelectedIndicator() {
	return <View style={styles.view} />;
}

const styles = StyleSheet.create({
	view: {
		position: 'absolute',
		left: 0,
		width: 5,
		top: 0,
		bottom: 0,
		backgroundColor: ColorsEnum.PRIMARY,
		borderTopRightRadius: 4,
		borderBottomRightRadius: 4,
	},
});

export default ChapterSelectedIndicator;
