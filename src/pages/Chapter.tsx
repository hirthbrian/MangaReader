import React, { useState, useEffect } from 'react';
import {
	FlatList,
	NativeScrollEvent,
	useWindowDimensions,
	NativeSyntheticEvent,
	StyleSheet,
	View,
} from 'react-native';

import useChapterStore from '../store/chapterStore';

import Loading from '../atoms/Loading';
import Progress from '../components/Progress';
import Page from '../components/Page';
import Footer from '../organisms/Footer';
import { getImages } from '../utils';

import Colors from '../colors';

export interface Chapter {
	index: number;
	title: string;
	url: string;
}

export interface Props {
	initialIndex: number;
	initialTitle: string;
	chapters: Chapter[];
}

function Chapter() {
	const { width } = useWindowDimensions();
	const [images, setImages] = useState([]);
	const [showChapters, setShowChapters] = useState(true);
	const [showFooter, setShowFooter] = useState(true);
	const [loading, setLoading] = useState(true);
	const [progress, setProgress] = useState(0);

	const chapterIndex = useChapterStore((state) => state.index);
	const chapterTitle = useChapterStore((state) => state.title);

	useEffect(() => {
		setLoading(true);
		getImages(chapterIndex).then((images) => {
			setImages(images);
			setLoading(false);
			// const value = (await AsyncStorage.getItem("@chapter")) || 1;
		});
		// AsyncStorage.setItem("@chapter", index.toString());
	}, [chapterIndex]);

	const renderPage = ({ item }) => (
		<Page uri={item} onPress={() => setShowFooter(!showFooter)} />
	);

	const renderFooter = () => (
		<Footer
			index={chapterIndex}
			title={chapterTitle}
			isVisible={showFooter}
			showChapters={setShowChapters}
			onChapterChanged={(index: number) => {
				setIndex(index);
				setTitle(chapters[index - 1].title);
			}}
		/>
	);

	const onMomentum = ({
		nativeEvent: { contentSize, contentOffset, layoutMeasurement },
	}: NativeSyntheticEvent<NativeScrollEvent>) => {
		const percentage =
			(contentOffset.x + layoutMeasurement.width) / contentSize.width;
		setShowFooter(percentage === 1);
		setProgress(percentage);
	};

	if (loading) {
		return <Loading />;
	}

	return (
		<View style={styles.container}>
			<FlatList
				horizontal
				data={images}
				renderItem={renderPage}
				snapToInterval={width}
				decelerationRate="fast"
				keyExtractor={(item) => item}
				showsHorizontalScrollIndicator={false}
				onMomentumScrollEnd={onMomentum}
				onMomentumScrollBegin={onMomentum}
			/>
			<Progress progress={progress} />
			{renderFooter()}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
	},
});

export default Chapter;
