import { Image, Pressable, StyleSheet, View } from 'react-native';

import { IMangaShort } from '~domain/entities';
import { useTheme } from '~infrastructure/hooks/useTheme';
import StatusTag from '~ui/atoms/StatusTag';
import Tag from '~ui/atoms/Tag';
import { TextHeading } from '~ui/atoms/Texts';

const styles = StyleSheet.create({
	container: {
		padding: 6,
		borderRadius: 8,
		flexDirection: 'row',
		gap: 5,
	},
	cover: {
		borderRadius: 4,
		borderWidth: StyleSheet.hairlineWidth,
	},
	nameContainer: {
		flex: 1,
		paddingHorizontal: 3,
		paddingVertical: 5,
	},
	tagsContainer: {
		flexDirection: 'row',
		gap: 5,
	},
});

type Props = {
	data: IMangaShort;
	onPress?: () => void;
	width?: number;
};

function MangaListFullCard({ data, onPress, width = 70 }: Props) {
	const { colors } = useTheme();

	return (
		<Pressable onPress={onPress}>
			{({ pressed }) => (
				<View
					style={[
						styles.container,
						{
							backgroundColor: pressed
								? colors.backgroundDark
								: colors.backgroundLight,
						},
					]}
				>
					<Image
						source={{ uri: data.cover }}
						style={[
							{
								width,
								height: width / (5 / 7),
								borderColor: colors.backgroundDark,
							},
							styles.cover,
						]}
					/>
					<View style={styles.nameContainer}>
						<TextHeading numberOfLines={2}>{data.title}</TextHeading>
						<View style={styles.tagsContainer}>
							<StatusTag status={data.status} />
							<Tag label={data.year.toString()} />
						</View>
					</View>
				</View>
			)}
		</Pressable>
	);
}

export default MangaListFullCard;
