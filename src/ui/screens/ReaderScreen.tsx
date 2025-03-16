import {
	type StaticScreenProps,
	useNavigation,
} from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { colorPalettes } from '~domain/colors';
import { IChapter } from '~domain/entities';
import { getImages } from '~infrastructure/fetch';
import Loading from '~ui/atoms/Loading';
import Page from '~ui/atoms/Page';
import Footer from '~ui/organisms/Footer';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colorPalettes.light.black,
	},
});

type Props = StaticScreenProps<{
	data: IChapter;
}>;

function ReaderScreen({ route }: Props) {
	const navigation = useNavigation();
	const [hideEverything, setHideEverything] = useState(false);
	const [page, setPage] = useState<number>(0);
	const chapterData = route?.params?.data;
	const [zoomedIn, setZoomedIn] = useState<boolean>(false);

	const { data, isLoading } = useQuery({
		queryKey: ['images', chapterData.id],
		queryFn: () => getImages(chapterData.id),
	});

	useEffect(() => {
		navigation.setOptions({ headerShown: !hideEverything });
	}, [hideEverything, navigation]);

	const onTap = () => {
		setHideEverything(!hideEverything);
	};

	const renderFooter = useCallback(
		() => <Footer data={chapterData} currentPage={page} />,
		[chapterData, page],
	);

	if (isLoading) {
		return <Loading />;
	}
	return (
		<View style={styles.container}>
			<FlatList
				horizontal
				scrollEnabled={!zoomedIn}
				data={data}
				pagingEnabled
				renderItem={({ item }) => (
					<Page
						uri={item}
						onTap={onTap}
						_zoomedIn={zoomedIn}
						setZoomedIn={setZoomedIn}
					/>
				)}
				onViewableItemsChanged={({ viewableItems }) => {
					if (viewableItems[0]?.index) {
						setPage(viewableItems[0].index);
					}
				}}
				decelerationRate="fast"
				showsHorizontalScrollIndicator={false}
			/>
			{hideEverything ? null : renderFooter()}
		</View>
	);
}

export default ReaderScreen;
