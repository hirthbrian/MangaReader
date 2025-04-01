import { useQuery } from '@tanstack/react-query';
import { StyleSheet, View } from 'react-native';

import { getChapters } from '~infrastructure/fetch';
import Loading from '~ui/atoms/Loading';
import { TextHeading } from '~ui/atoms/Texts';

const styles = StyleSheet.create({
	container: {
		gap: 10,
	},
});

type Props = {
	id: string;
};

function ChapterList({ id }: Props) {
	const { isLoading } = useQuery({
		queryKey: ['chapters', id],
		queryFn: () => getChapters(id),
	});

	if (isLoading) {
		return <Loading />;
	}

	return (
		<View style={styles.container}>
			<TextHeading>Chapters</TextHeading>
			{/* {data?.data?.map((item) => (
				<ChapterListItem key={item.id} data={item} />
			))} */}
		</View>
	);
}

export default ChapterList;
