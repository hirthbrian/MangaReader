import { StaticScreenProps } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { SectionList, StyleSheet, View } from 'react-native';

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

	const query = useQuery({
		queryKey: ['getChapters', id],
		queryFn: () => getChapters(id, 15),
	});

	const sections = useMemo(() => {
		if (!query.data) {
			return [];
		}

		const grouped = query.data.reduce<Record<string, typeof query.data>>(
			(acc, chapter) => {
				const chapterNumber = chapter.chapter;

				// Create array for this chapter number if it doesn't exist
				acc[chapterNumber] = acc[chapterNumber] || [];
				acc[chapterNumber].push(chapter);

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

	return (
		<SectionList
			sections={sections}
			SectionSeparatorComponent={renderSectionSeparator}
			ItemSeparatorComponent={renderItemSeparator}
			contentContainerStyle={styles.container}
			renderItem={({ item, index, section }) => {
				let type: TreeIndicatorType = 'middle';
				if (index === 0) {
					type = 'start';
				}
				if (index === section.data.length - 1) {
					type = 'end';
				}

				return <ChapterListItem key={item.id} type={type} data={item} />;
			}}
		/>
	);
}

export default ChaptersScreen;
