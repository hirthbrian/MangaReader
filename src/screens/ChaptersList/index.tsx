import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { sectionBySaga } from '../../utils';
import ChapterRowItem from '../../components/ChapterRowItem';
import { getChapters } from '../../utils';
import Loading from '../../components/Loading';

import { SafeAreaContainer, SectionHeaderTitle } from './styles';

function ChaptersList() {
	const navigation = useNavigation();
	const [chapters, setChapters] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		getChapters().then((chapters) => {
			setChapters(chapters);
			setIsLoading(false);
		});
	}, []);

	const selectChapter = (index: string, title: string) => {
		navigation.navigate('Chapter', { index, title });
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
		<SectionHeaderTitle numberOfLines={1}>{title}</SectionHeaderTitle>
	);

	if (isLoading) return <Loading />;

	return (
		<SafeAreaContainer>
			<FlatList
				data={chapters.reverse()}
				renderItem={renderItem}
				keyExtractor={({ index }) => index}
			/>
		</SafeAreaContainer>
	);
}

export default ChaptersList;
