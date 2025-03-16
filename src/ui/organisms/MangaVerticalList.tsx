import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import type { IMangaShort } from '~domain/entities';
import MangaListFullCard from '~ui/molecules/MangaListFullCard';

const styles = StyleSheet.create({
	flatListContainer: {
		gap: 10,
		padding: 15,
	},
});

type Props = {
	data: Array<IMangaShort>;
};

function MangaVerticalList({ data }: Props) {
	const navigation = useNavigation();

	const onPress = useCallback(
		(id: string) => {
			navigation.navigate('MangaScreen', { id });
		},
		[navigation],
	);

	return (
		<FlatList
			data={data}
			renderItem={({ item }) => (
				<MangaListFullCard data={item} onPress={() => onPress(item.id)} />
			)}
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={styles.flatListContainer}
		/>
	);
}

export default MangaVerticalList;
