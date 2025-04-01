import { useNavigation } from '@react-navigation/native';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import Animated, {
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated';

import type { IChapter } from '~domain/entities';
import { languageList } from '~domain/utils';
import { useTheme } from '~infrastructure/hooks/useTheme';
import { IconClock, IconExternal } from '~ui/atoms/Icons';
import { TextBody, TextSubheading } from '~ui/atoms/Texts';
import TreeIndicator from '~ui/atoms/TreeIndicator';

const styles = StyleSheet.create({
	container: {
		padding: 10,
		gap: 5,
		borderRadius: 8,
		flexDirection: 'row',
	},
	innerContainer: {
		flex: 1,
		gap: 5,
	},
	textTitle: {
		flex: 1,
	},
	firstLine: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 5,
	},
	secondLine: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 5,
	},
	dateContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 5,
	},
});

type Props = {
	data: IChapter;
	type?: 'start' | 'middle' | 'end';
};

function ChapterListItem({ data, type }: Props) {
	const { colors } = useTheme();
	const navigation = useNavigation();
	const [pressed, setPressed] = useState<boolean>(false);

	const backgroundColor = useAnimatedStyle(
		() => ({
			backgroundColor: withTiming(
				pressed ? colors.backgroundDark : colors.backgroundLight,
			),
		}),
		[pressed, colors],
	);

	const borderTopRadius = useMemo(
		() => (type === 'start' ? 8 : undefined),
		[type],
	);

	const borderBottomRadius = useMemo(
		() => (type === 'end' ? 8 : undefined),
		[type],
	);

	const borderRadius = useMemo(() => (type ? 0 : 8), [type]);

	const onPress = () => {
		if (data.externalUrl) {
			navigation.navigate('ExternalReaderScreen', { url: data.externalUrl });
		} else {
			navigation.navigate('ReaderScreen', { data });
		}
	};

	return (
		<Pressable
			onPress={onPress}
			onPressIn={() => setPressed(true)}
			onPressOut={() => setPressed(false)}
		>
			<Animated.View
				style={[
					styles.container,
					backgroundColor,
					{
						borderRadius: borderRadius,
						borderTopRightRadius: borderTopRadius,
						borderTopLeftRadius: borderTopRadius,
						borderBottomRightRadius: borderBottomRadius,
						borderBottomLeftRadius: borderBottomRadius,
					},
				]}
			>
				<TreeIndicator type={type} />
				<View style={styles.innerContainer}>
					<View style={styles.firstLine}>
						<CountryFlag
							size={12}
							isoCode={languageList[data.translatedLanguage]}
						/>
						<TextSubheading style={styles.textTitle} numberOfLines={1}>
							{`Ch.${data.chapter}${data.title ? ` - ${data.title}` : ''}`}
						</TextSubheading>
						<View style={styles.dateContainer}>
							<IconClock size={14} color={colors.neutral} />
							<TextBody>{data.date}</TextBody>
						</View>
					</View>
					<View style={styles.secondLine}>
						<TextBody>{data.scanlationGroup?.name}</TextBody>
						{data.externalUrl && (
							<IconExternal size={14} color={colors.neutral} />
						)}
					</View>
				</View>
			</Animated.View>
		</Pressable>
	);
}

export default ChapterListItem;
