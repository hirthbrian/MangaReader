import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Colors from '../colors';

type ChapterTitleProps = {
	children: React.ReactNode;
	color?: string;
};

const ChapterTitle = ({
	children,
	color = Colors.black,
}: ChapterTitleProps) => {
	return (
		<Text
			numberOfLines={1}
			style={[
				styles.text,
				{
					color,
				},
			]}
		>
			{children}
		</Text>
	);
};

const styles = StyleSheet.create({
	text: {
		fontSize: 16,
		fontFamily: 'Inter-SemiBold',
	},
});

export default ChapterTitle;
