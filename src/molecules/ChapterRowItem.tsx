import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { pad } from '../utils';

import Colors from '../colors';
import ChapterTitle from '../atoms/ChapterTitle';

const ITEM_HEIGHT = 66.5;

type ChapterRowItemProps = {
	title: string;
	index: number;
	onPress: Function;
	isChapterSelected: boolean;
};

function ChapterRowItem({
	title,
	index,
	onPress,
	isChapterSelected,
}: ChapterRowItemProps) {
	return (
		<Pressable onPress={() => onPress(index, title)}>
			{({ pressed }) => (
				<View style={styles({ pressed }).container}>
					{isChapterSelected && <View style={styles({}).itemSelected} />}
					<View style={styles({}).itemContainer}>
						<Text style={styles({}).itemNumber} numberOfLines={2}>
							{pad(index.toString(), 3)}
						</Text>
						<ChapterTitle
							color={isChapterSelected ? Colors.green : Colors.black}
						>
							{title}
						</ChapterTitle>
					</View>
				</View>
			)}
		</Pressable>
	);
}

type StyleSheetProps = {
	pressed?: boolean;
};

const styles = ({ pressed }: StyleSheetProps) =>
	StyleSheet.create({
		container: {
			flexDirection: 'row',
			padding: 10,
			backgroundColor: pressed ? Colors.lightBlue : Colors.white,
		},
		itemContainer: {
			flex: 1,
		},
		itemNumber: {
			fontSize: 18,
			paddingBottom: 5,
			fontFamily: 'Inter-Black',
		},
		itemSelected: {
			height: ITEM_HEIGHT,
			position: 'absolute',
			width: 5,
			backgroundColor: Colors.green,
			borderTopRightRadius: 4,
			borderBottomRightRadius: 4,
		},
	});

export default ChapterRowItem;
