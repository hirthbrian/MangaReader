import { StaticScreenProps } from '@react-navigation/native';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { SectionList, StyleSheet, View } from 'react-native';

import { IChapter } from '~domain/entities';
import { TreeIndicatorType } from '~domain/types';
import { getChapters } from '~infrastructure/fetch';
import { useTheme } from '~infrastructure/hooks/useTheme';
import ChapterListItem from '~ui/molecules/ChapterListItem';

const styles = StyleSheet.create({
	container: {
		padding: 15,
	},
	sectionSeparator: {
		height: 20,
	},
});

type Props = StaticScreenProps<{
	id: string;
}>;

function ChaptersScreen({ route }: Props) {
	const { colors } = useTheme();
	const { id } = route.params;

	const query = useInfiniteQuery({
		queryKey: ['getChapters', id],
		queryFn: ({ pageParam }) => getChapters(id, pageParam),
		initialPageParam: 0,
		getNextPageParam: (lastPage) => lastPage.offset,
	});

	const sections = useMemo(() => {
		if (!query.data) {
			return [];
		}

		const concatPages = query.data.pages.reduce(
			(acc, page) => acc.concat(page.data),
			[] as Array<IChapter>,
		);
		const grouped = concatPages?.reduce<Record<string, Array<IChapter>>>(
			(acc, data) => {
				const chapterNumber = data.chapter;

				// Create array for this chapter number if it doesn't exist
				acc[chapterNumber] = acc[chapterNumber] || [];
				acc[chapterNumber].push(data);

				return acc;
			},
			{},
		);
		// Convert the grouped object directly to the sections format
		return Object.entries(grouped).map(([title, data]) => ({
			title,
			data,
		}));
	}, [query]);

	const renderSectionSeparator = () => <View style={styles.sectionSeparator} />;

	const renderItemSeparator = () => (
		<View
			style={{
				height: StyleSheet.hairlineWidth,
				backgroundColor: colors.backgroundDark,
			}}
		/>
	);

	const onEndReached = () => {
		if (!query.isFetchingNextPage) {
			query.fetchNextPage();
		}
	};

	return (
		<SectionList
			sections={sections}
			SectionSeparatorComponent={renderSectionSeparator}
			ItemSeparatorComponent={renderItemSeparator}
			contentContainerStyle={styles.container}
			onEndReached={onEndReached}
			renderItem={({ item, index, section }) => {
				let type: TreeIndicatorType = 'middle';

				if (section.data.length === 1) {
					type = undefined;
				} else if (index === 0) {
					type = 'start';
				} else if (index === section.data.length - 1) {
					type = 'end';
				}

				return <ChapterListItem key={item.id} type={type} data={item} />;
			}}
		/>
	);
}

export default ChaptersScreen;
