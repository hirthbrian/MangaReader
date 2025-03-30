import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import type { IMangaShort } from '~domain/entities';
import { useTheme } from '~infrastructure/hooks/useTheme';
import { IconArrowRight } from '~ui/atoms/Icons';
import { TextHeading } from '~ui/atoms/Texts';
import MangaListCard from '~ui/molecules/MangaListCard';

const styles = StyleSheet.create({
	container: { gap: 10 },
	titleContainer: {
		paddingHorizontal: 15,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	flatListContainer: {
		gap: 10,
		paddingHorizontal: 15,
	},
});

type Props = {
	data: Array<IMangaShort>;
	title: string;
};

function MangaHorizontalList({ data, title }: Props) {
	const { colors } = useTheme();
	const navigation = useNavigation();

	const onPress = useCallback(
		(id: string) => {
			navigation.navigate('MangaScreen', { id });
		},
		[navigation],
	);

	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<TextHeading>{title}</TextHeading>
				<IconArrowRight size={18} color={colors.neutral} />
			</View>
			<FlatList
				horizontal
				data={data}
				renderItem={({ item }) => (
					<MangaListCard
						cover={item.cover}
						title={item.title}
						onPress={() => onPress(item.id)}
					/>
				)}
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.flatListContainer}
			/>
		</View>
	);
}

export default MangaHorizontalList;
