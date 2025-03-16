import {
	type StaticScreenProps,
	useNavigation,
} from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { Image, StyleSheet, useWindowDimensions, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
	interpolate,
	useAnimatedRef,
	useAnimatedStyle,
	useScrollViewOffset,
} from 'react-native-reanimated';
import type { AnimatedScrollView } from 'react-native-reanimated/lib/typescript/component/ScrollView';

import { getManga } from '~infrastructure/fetch';
import { useTheme } from '~infrastructure/hooks/useTheme';
import ButtonSecondary from '~ui/atoms/ButtonSecondary';
import {
	TextBody,
	TextHeading,
	TextSubheading,
	TextTitle,
} from '~ui/atoms/Texts';
import TagList from '~ui/molecules/TagList';
import ChapterList from '~ui/organisms/ChapterList';

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollView: { paddingBottom: 100 },
	cover: {
		position: 'absolute',
		transformOrigin: 'top',
	},
	titleContainer: {
		paddingTop: 100,
		paddingHorizontal: 15,
	},
	infoContainer: {
		padding: 15,
	},
	showMoreContainer: {
		padding: 15,
	},
});

type Props = StaticScreenProps<{
	id: string;
	backgroundColor?: string;
}>;

function MangaScreen({ route }: Props) {
	const id = route.params.id;
	const { colors } = useTheme();
	const animatedRef = useAnimatedRef<AnimatedScrollView>();
	const scrollOffset = useScrollViewOffset(animatedRef);

	const navigation = useNavigation();
	const { width } = useWindowDimensions();
	const [ratio, setRatio] = useState(7 / 5);
	const [titleContainerHeight, setTitleContainerHeight] = useState(1);

	const { data } = useQuery({
		queryKey: ['manga', id],
		queryFn: () => getManga(id),
	});

	useEffect(() => {
		navigation.setOptions({ title: data?.title });
		if (data?.cover) {
			Image.getSize(data?.cover, (imageWidth, imageHeight) => {
				setRatio(imageHeight / imageWidth);
			});
		}
	}, [data, navigation]);

	const coverHeight = useMemo(() => width * ratio, [ratio, width]);

	const animatedCoverStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					scale: interpolate(
						scrollOffset.value,
						[-coverHeight, 0, coverHeight],
						[2, 1, 1],
					),
				},
			],
		};
	}, []);

	const renderCover = () => {
		return (
			<Animated.Image
				style={[
					{
						width,
						height: coverHeight,
						backgroundColor: colors.backgroundDark,
					},
					styles.cover,
					animatedCoverStyle,
				]}
				source={{ uri: data?.cover }}
			/>
		);
	};

	const renderTitle = () => {
		return (
			<LinearGradient colors={[`${colors.background}00`, colors.background]}>
				<View
					style={styles.titleContainer}
					onLayout={(event) =>
						setTitleContainerHeight(event.nativeEvent.layout.height)
					}
				>
					{data?.title && (
						<TextTitle numberOfLines={2}>{data?.title}</TextTitle>
					)}
					{data?.originalTitle && (
						<TextHeading numberOfLines={1}>{data?.originalTitle}</TextHeading>
					)}
				</View>
			</LinearGradient>
		);
	};

	const renderInfo = () => {
		return (
			<View style={styles.infoContainer}>
				<TextSubheading>Author</TextSubheading>
				{data?.author && <TagList tags={[data.author]} />}
				<TextSubheading>Genre</TextSubheading>
				{data?.genres && <TagList tags={data.genres} />}
				<TextSubheading>Description</TextSubheading>
				<TextBody numberOfLines={5}>{data?.description}</TextBody>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			{renderCover()}
			<Animated.ScrollView
				ref={animatedRef}
				contentContainerStyle={[
					{ paddingTop: coverHeight - titleContainerHeight },
					styles.scrollView,
				]}
				scrollEventThrottle={16}
			>
				{renderTitle()}
				<View style={{ backgroundColor: colors.background }}>
					{renderInfo()}
					{data && <ChapterList id={data.id} />}
					<View style={styles.showMoreContainer}>
						<ButtonSecondary
							title="Show more"
							onPress={() => navigation.navigate('ChaptersScreen', { id })}
						/>
					</View>
				</View>
			</Animated.ScrollView>
		</View>
	);
}

export default MangaScreen;
