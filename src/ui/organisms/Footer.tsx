import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IChapter } from '~domain/entities';
import { useTheme } from '~infrastructure/hooks/useTheme';
import ProgressBar from '~ui/atoms/ProgressBar';
import { TextSubheading } from '~ui/atoms/Texts';

const styles = StyleSheet.create({
	container: {
		padding: 15,
	},
});

type Props = {
	data: IChapter;
	currentPage: number;
};

function Footer({ data, currentPage }: Props) {
	const { colors } = useTheme();
	const insets = useSafeAreaInsets();

	return (
		<View
			style={[
				styles.container,
				{
					paddingBottom: insets.bottom,
					backgroundColor: colors.background,
				},
			]}
		>
			<View>
				<TextSubheading>
					{`Ch.${data.chapter}${data.title ? ` - ${data.title}` : ''}`}
				</TextSubheading>
				<ProgressBar index={currentPage} total={data.pages} />
			</View>
		</View>
	);
}

export default Footer;
