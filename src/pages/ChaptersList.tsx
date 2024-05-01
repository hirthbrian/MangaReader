import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { sectionBySaga } from '../utils';
import ChapterRowItem from '../molecules/ChapterRowItem';
import { getChapters } from '../utils';
import Loading from '../atoms/Loading';
import Colors from '../colors';
import useChapterStore from '../store/chapterStore';

const HEADER_HEIGHT = 71;

function ChaptersList() {
	const navigation = useNavigation();
	const [chapters, setChapters] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const setChapterIndex = useChapterStore((state) => state.setIndex);
	const setChapterTitle = useChapterStore((state) => state.setTitle);

	useEffect(() => {
		setIsLoading(true);
		getChapters().then((chapters) => {
			setChapters(chapters);
			setIsLoading(false);
		});
	}, []);

	const selectChapter = (index: string, title: string) => {
		setChapterIndex(index);
		setChapterTitle(title);
	};

	const renderItem = ({ item }) => (
		<ChapterRowItem
			title={item.title}
			index={item.index}
			onPress={() => selectChapter(item.index, item.title)}
			isChapterSelected={item.index === 1080}
		/>
	);

	const renderSectionHeader = ({ section: { title } }) => (
		<Text style={styles.sectionHeaderTitle} numberOfLines={1}>
			{title}
		</Text>
	);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<FlatList
			data={chapters.reverse()}
			renderItem={renderItem}
			keyExtractor={({ index }) => index}
		/>
	);
}

const styles = StyleSheet.create({
	sectionHeaderTitle: {
		fontSize: 42,
		fontFamily: 'Inter-Bold',
		padding: 10,
		color: Colors.lightBlue,
	},
});

export default ChaptersList;
