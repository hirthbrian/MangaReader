import { useNavigation } from '@react-navigation/native';
import { useCallback, useMemo } from 'react';
import { FlatList, StyleSheet, useWindowDimensions } from 'react-native';

import type { IMangaShort } from '~domain/entities';
import { useTheme } from '~infrastructure/hooks/useTheme';
import MangaListCard from '~ui/molecules/MangaListCard';

const styles = StyleSheet.create({
	contentContainerStyle: {
		gap: 15,
		padding: 15,
	},
	columnWrapperStyle: {
		gap: 10,
	},
});

type Props = {
	data: Array<IMangaShort>;
	numColumns?: number;
};

function MangaGrid({ data, numColumns = 3 }: Props) {
	const { colors } = useTheme();
	const { width } = useWindowDimensions();
	const navigation = useNavigation();

	const itemWidth = useMemo(
		() =>
			(width -
				styles.columnWrapperStyle.gap * (numColumns - 1) -
				styles.contentContainerStyle.padding * 2) /
			numColumns,
		[numColumns, width],
	);

	const onPress = useCallback(
		(id: string) => {
			navigation.navigate('MangaScreen', { id });
		},
		[navigation],
	);

	return (
		<FlatList
			data={data}
			numColumns={numColumns}
			renderItem={({ item }) => (
				<MangaListCard
					cover={item.cover}
					title={item.title}
					onPress={() => onPress(item.id)}
					width={itemWidth}
				/>
			)}
			showsHorizontalScrollIndicator={false}
			columnWrapperStyle={styles.columnWrapperStyle}
			contentContainerStyle={[
				styles.contentContainerStyle,
				{
					backgroundColor: colors.background,
				},
			]}
		/>
	);
}

export default MangaGrid;
