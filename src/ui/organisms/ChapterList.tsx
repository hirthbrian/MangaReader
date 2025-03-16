import { useQuery } from '@tanstack/react-query';
import { StyleSheet, View } from 'react-native';

import { getChapters } from '~infrastructure/fetch';
import Loading from '~ui/atoms/Loading';
import { TextSubheading } from '~ui/atoms/Texts';
import ChapterListItem from '~ui/molecules/ChapterListItem';

const styles = StyleSheet.create({
	container: {
		gap: 10,
		paddingHorizontal: 15,
	},
});

type Props = {
	id: string;
};

function ChapterList({ id }: Props) {
	const { data, isLoading } = useQuery({
		queryKey: ['chapters', id],
		queryFn: () => getChapters(id),
	});

	if (isLoading) {
		return <Loading />;
	}

	return (
		<View style={styles.container}>
			<TextSubheading>Chapters:</TextSubheading>
			{data?.map((item) => (
				<ChapterListItem key={item.id} data={item} />
			))}
		</View>
	);
}

export default ChapterList;
