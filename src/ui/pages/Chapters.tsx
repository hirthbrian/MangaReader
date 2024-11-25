import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
	FlatList,
	SafeAreaView,
	SectionList,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { getChapters } from '../../infrastructure/fetch';
import Loading from '../atoms/Loading';
import ColorsEnum from '../../domain/enum/ColorsEnum';
import Chapter from '../molecules/Chapter';
import { IChapter } from '../../domain/entities';
import useChapterStore from '../../infrastructure/zustand/chapterStore';
import { useQuery } from '@tanstack/react-query';
import Animated, { FadeIn } from 'react-native-reanimated';

function Chapters({ route }) {
	const navigation = useNavigation();
	const mangaId = route?.params?.mangaId;

	const query = useQuery({
		queryKey: ['chapters', mangaId],
		queryFn: () => getChapters(mangaId),
	});

	const setChapter = useChapterStore((state) => state.setChapter);

	const onPress = useCallback(
		(chapterId: string, chapterName: string) => {
			navigation.navigate('Reader', { chapterId, chapterName });
		},
		[navigation, setChapter],
	);

	const renderItem = ({ item, index }: { item: IChapter; index: number }) => {
		return (
			<Animated.View entering={FadeIn.delay(Math.min(index * 50, 1000))}>
				<Chapter
					name={item.name}
					index={item.index}
					date={item.date}
					onPress={() => onPress(item.id, item.name)}
					// isChapterSelected={item.index === 1112}
				/>
			</Animated.View>
		);
	};

	if (query.isLoading) {
		return <Loading />;
	}

	return (
		<FlatList
			onRefresh={query.refetch}
			refreshing={query.isRefetching}
			data={query.data}
			renderItem={renderItem}
			style={styles.container}
			contentContainerStyle={{ gap: 10 }}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		backgroundColor: ColorsEnum.BACKGROUND,
	},
});

export default Chapters;
