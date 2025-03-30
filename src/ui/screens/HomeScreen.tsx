import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import {
	getMangaFromList,
	getMostPopularManga,
	getRecentlyAddedManga,
} from '~infrastructure/fetch';
import { useTheme } from '~infrastructure/hooks/useTheme';
import { IconSearch } from '~ui/atoms/Icons';
import Loading from '~ui/atoms/Loading';
import TextInput from '~ui/atoms/TextInput';
import MangaHorizontalList from '~ui/organisms/MangaHorizontalList';

const styles = StyleSheet.create({
	headerContainer: {
		padding: 15,
	},
});

function HomeScreen() {
	const navigation = useNavigation();
	const { colors } = useTheme();

	const query = useQuery({
		queryKey: ['getMostPopularManga'],
		queryFn: getMostPopularManga,
	});

	const query2 = useQuery({
		queryKey: ['getMostRecentManga'],
		queryFn: getRecentlyAddedManga,
	});

	const query3 = useQuery({
		queryKey: ['getList'],
		queryFn: () => getMangaFromList('805ba886-dd99-4aa4-b460-4bd7c7b71352'),
	});

	const renderSearchIcon = () => (
		<IconSearch size={18} color={colors.neutral} />
	);

	const renderHeader = () => (
		<View
			style={[styles.headerContainer, { backgroundColor: colors.background }]}
		>
			<TextInput
				editable={false}
				selectTextOnFocus={false}
				onPress={() => navigation.navigate('SearchScreen')}
				LeftElement={renderSearchIcon}
				placeholder="Search"
			/>
		</View>
	);

	if (query.isLoading) {
		return <Loading />;
	}

	return (
		<View>
			{renderHeader()}
			<FlatList
				data={[
					{ data: query3.data, title: 'Staff Picks' },
					{ data: query.data, title: 'Most Popular' },
					{ data: query2.data, title: 'Recent Chapter' },
				]}
				renderItem={({ item }) =>
					item.data ? (
						<MangaHorizontalList data={item.data} title={item.title} />
					) : null
				}
			/>
		</View>
	);
}

export default HomeScreen;
