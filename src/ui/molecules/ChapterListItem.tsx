import { useNavigation } from '@react-navigation/native';
import { useMemo, useState } from 'react';
import { Linking, Pressable, StyleSheet, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated';

import type { IChapter } from '~domain/entities';
import { languageToCountryCode } from '~domain/utils';
import { useTheme } from '~infrastructure/hooks/useTheme';
import { IconClock, IconExternal, IconUri } from '~ui/atoms/Icons';
import { TextBody, TextSubheading } from '~ui/atoms/Texts';

const styles = StyleSheet.create({
	container: {
		padding: 10,
		gap: 5,
		borderRadius: 8,
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

	const flagUri = useMemo(() => {
		const countryCode = languageToCountryCode[data.translatedLanguage];
		if (countryCode) {
			return `https://mangadex.org/img/flags/${
				languageToCountryCode[data.translatedLanguage]
			}.svg`;
		}
		return undefined;
	}, [data.translatedLanguage]);

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
			Linking.openURL(data.externalUrl);
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
				<View style={styles.firstLine}>
					{flagUri && <IconUri uri={flagUri} size={18} />}
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
			</Animated.View>
		</Pressable>
	);
}

export default ChapterListItem;
