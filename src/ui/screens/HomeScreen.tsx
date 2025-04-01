import { useQuery } from '@tanstack/react-query';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import {
	getMangaFromList,
	getMostPopularManga,
	getRecentlyAddedManga,
} from '~infrastructure/fetch';
import Loading from '~ui/atoms/Loading';
import MangaHorizontalList from '~ui/organisms/MangaHorizontalList';

const styles = StyleSheet.create({
	container: {
		paddingVertical: 15,
	},
});

function HomeScreen() {
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

	if (query.isLoading) {
		return <Loading />;
	}

	return (
		<FlatList
			data={[
				{ data: query3.data, title: 'Staff Picks' },
				{ data: query.data, title: 'Most Popular' },
				{ data: query2.data, title: 'Recent Chapter' },
			]}
			contentContainerStyle={styles.container}
			renderItem={({ item }) =>
				item.data ? (
					<MangaHorizontalList data={item.data} title={item.title} />
				) : null
			}
		/>
	);
}

export default HomeScreen;
