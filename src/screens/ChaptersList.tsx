import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import { sectionBySaga } from '../utils';
import ChapterRowItem from '../components/ChapterRowItem';
import { getChapters } from '../utils';
import Loading from '../components/Loading';
import Colors from '../colors';

export const ITEM_HEIGHT = 66.5;
export const HEADER_HEIGHT = 71;

export const SafeAreaContainer = styled.SafeAreaView`
	flex: 1;
	background-color: ${Colors.white};
`;

export const SectionHeaderTitle = styled.Text`
	font-size: 42px;
	font-family: InterBold;
	padding: 10px;
	color: ${Colors.lightBlue};
`;

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
