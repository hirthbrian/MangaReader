import React, { useState, useEffect } from 'react';
import {
	FlatList,
	NativeScrollEvent,
	useWindowDimensions,
	NativeSyntheticEvent,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';

import Loading from '../components/Loading';
import Progress from '../components/Progress';
import Page from '../components/Page';
import Footer from '../components/Footer';
import { getImages } from '../utils';

import { Props } from './types';

import styled from 'styled-components/native';

import Colors from '../colors';

export const Container = styled.View`
	flex: 1;
	background-color: ${Colors.white};
`;

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
	const {
		params: { index, title },
	} = useRoute();
	const { width } = useWindowDimensions();
	const [images, setImages] = useState([]);
	const [showChapters, setShowChapters] = useState(true);
	const [showFooter, setShowFooter] = useState(true);
	const [loading, setLoading] = useState(true);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		setLoading(true);
		getImages(index).then((images) => {
			setImages(images);
			setLoading(false);
			// const value = (await AsyncStorage.getItem("@chapter")) || 1;
		});
		// AsyncStorage.setItem("@chapter", index.toString());
	}, []);

	const renderPage = ({ item }) => (
		<Page uri={item} onPress={() => setShowFooter(!showFooter)} />
	);

	const renderFooter = () => (
		<Footer
			index={index}
			title={title}
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

	if (loading) return <Loading />;

	return (
		<Container>
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
		</Container>
	);
}

export default Chapter;
