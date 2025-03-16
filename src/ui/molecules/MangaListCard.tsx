import { Image, Pressable, StyleSheet, View } from 'react-native';

import { useTheme } from '~infrastructure/hooks/useTheme';
import { TextBody } from '~ui/atoms/Texts';

const styles = StyleSheet.create({
	cover: {
		borderRadius: 4,
		borderWidth: StyleSheet.hairlineWidth,
	},
	nameContainer: {
		paddingHorizontal: 3,
		paddingVertical: 5,
	},
});

type Props = {
	cover: string;
	onPress?: () => void;
	title: string;
	width?: number;
};

function MangaListCard({ cover, onPress, title, width = 120 }: Props) {
	const { colors } = useTheme();

	return (
		<Pressable onPress={onPress}>
			<View style={{ width }}>
				<Image
					source={{ uri: cover }}
					style={[
						{
							width,
							height: width / (5 / 7),
							borderColor: colors.backgroundLight,
						},
						styles.cover,
					]}
				/>
				<View style={styles.nameContainer}>
					<TextBody numberOfLines={2}>{title}</TextBody>
				</View>
			</View>
		</Pressable>
	);
}

export default MangaListCard;
