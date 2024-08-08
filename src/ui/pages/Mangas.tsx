import React, { useCallback } from 'react';
import {
	FlatList,
	Image,
	Pressable,
	StyleSheet,
	useWindowDimensions,
	View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { getMangas } from '../../infrastructure/fetch';
import Loading from '../atoms/Loading';
import ColorsEnum from '../../domain/enum/ColorsEnum';
import { IManga } from '../../domain/entities';
import { useQuery } from '@tanstack/react-query';
import RegularText from '../atoms/Texts/RegularText';
import Manga from '../molecules/Manga';
import Animated, { FadeIn } from 'react-native-reanimated';

function Mangas() {
	const { width } = useWindowDimensions();
	const navigation = useNavigation();

	const query = useQuery({
		queryKey: ['mangas'],
		queryFn: getMangas,
	});

	const onPress = useCallback(
		(mangaId: string) => {
			navigation.navigate('Chapters', { mangaId });
		},
		[navigation],
	);

	const renderItem = ({ item, index }: { item: IManga; index: number }) => (
		<Animated.View entering={FadeIn.delay(index * 100)}>
			<Manga
				width={(width - 5 - 20) / 2}
				banner={item.banner}
				title={item.name}
				onPress={() => onPress(item.id)}
			/>
		</Animated.View>
	);

	if (query.isLoading) {
		return <Loading />;
	}

	return (
		<FlatList
			// numColumns={2}
			// onRefresh={query.refetch}
			// refreshing={query.isRefetching}
			data={query.data}
			renderItem={renderItem}
			contentContainerStyle={styles.container}
			style={{ backgroundColor: ColorsEnum.BACKGROUND }}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: 20,
		padding: 10,

		backgroundColor: ColorsEnum.BACKGROUND,
	},
});

export default Mangas;
