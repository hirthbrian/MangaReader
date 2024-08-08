import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
	FlatList,
	NativeScrollEvent,
	useWindowDimensions,
	NativeSyntheticEvent,
	StyleSheet,
	View,
} from 'react-native';

import useChapterStore from '../../infrastructure/zustand/chapterStore';

import Loading from '../atoms/Loading';
import Page from '../atoms/Page';
import Footer from '../organisms/Footer';
import { getImages } from '../../infrastructure/fetch';
import ColorsEnum from '../../domain/enum/ColorsEnum';
import ReaderGestureHandler from '../templates/ReaderGestureHandler';
import { useQuery } from '@tanstack/react-query';
import { IChapter } from '../../domain/entities';
import Animated from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

function Reader({ route }) {
	const navigation = useNavigation();
	const { width } = useWindowDimensions();
	const [hideEverything, setHideEverything] = useState(false);
	const [page, setPage] = useState<number>(0);
	const chapterId = route?.params?.chapterId;
	const chapterName = route?.params?.chapterName;
	const [zoomedIn, setZoomedIn] = useState<boolean>(false);

	const chapterIndex = useChapterStore((state) => state.index);

	const query = useQuery({
		queryKey: ['images', chapterId],
		queryFn: () => getImages(chapterId),
	});

	const totalPages = useMemo(() => query.data?.length, [query.data?.length]);

	useEffect(() => {
		navigation.setOptions({ headerShown: !hideEverything });
	}, [hideEverything]);

	const onTap = () => {
		setHideEverything(!hideEverything);
	};

	const renderPage = ({ item }) => (
		<Page
			uri={item.url}
			onTap={onTap}
			zoomedIn={zoomedIn}
			setZoomedIn={setZoomedIn}
		/>
	);

	const renderFooter = useCallback(
		() => (
			<Footer
				currentIndex={chapterIndex}
				index={chapterIndex}
				title={chapterName}
				totalPages={totalPages}
				currentPage={page}
			/>
		),
		[chapterIndex, page, totalPages],
	);

	const onViewableItemsChanged = useCallback(({ viewableItems }) => {
		if (viewableItems[0]) {
			setPage(viewableItems[0].index);
		}
	}, []);

	if (query.isLoading) {
		return <Loading />;
	}

	return (
		<View style={styles.container}>
			<FlatList
				horizontal
				scrollEnabled={!zoomedIn}
				data={query.data}
				pagingEnabled
				renderItem={renderPage}
				onViewableItemsChanged={onViewableItemsChanged}
				decelerationRate="fast"
				showsHorizontalScrollIndicator={false}
			/>
			{hideEverything ? null : renderFooter()}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: ColorsEnum.BLACK,
	},
});

export default Reader;
