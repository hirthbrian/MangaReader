import {
	type StaticScreenProps,
	useNavigation,
} from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import {
	Image,
	ImageBackground,
	ScrollView,
	StyleSheet,
	useWindowDimensions,
	View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { getManga } from '~infrastructure/fetch';
import { useTheme } from '~infrastructure/hooks/useTheme';
import ButtonSecondary from '~ui/atoms/ButtonSecondary';
import { TextBody, TextHeading, TextTitle } from '~ui/atoms/Texts';
import TagList from '~ui/molecules/TagList';
import ChapterList from '~ui/organisms/ChapterList';

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 15,
		paddingBottom: 50,
		gap: 15,
	},
	gradient: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	infoContainer: {
		gap: 15,
	},
	infoSectionContainer: {
		gap: 5,
	},
});

type Props = StaticScreenProps<{
	id: string;
	backgroundColor?: string;
}>;

function MangaScreen({ route }: Props) {
	const id = route.params.id;
	const { colors } = useTheme();

	const navigation = useNavigation();
	const { width } = useWindowDimensions();
	const [ratio, setRatio] = useState(7 / 5);

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

	const renderCover = () => {
		return (
			<ImageBackground
				style={{
					width,
					height: coverHeight / 2,
					backgroundColor: colors.backgroundDark,
				}}
				source={{ uri: data?.cover }}
			>
				<LinearGradient
					style={styles.gradient}
					colors={[`${colors.background}00`, colors.background]}
				/>
			</ImageBackground>
		);
	};

	const renderTitle = () => {
		return (
			<View>
				{data?.title && (
					<TextTitle textAlign="center" numberOfLines={2}>
						{data?.title}
					</TextTitle>
				)}
				{data?.originalTitle && (
					<TextHeading textAlign="center" numberOfLines={1}>
						{data?.originalTitle}
					</TextHeading>
				)}
			</View>
		);
	};

	const renderInfo = () => {
		return (
			<View style={styles.infoContainer}>
				<View style={styles.infoSectionContainer}>
					<TextHeading>Author</TextHeading>
					{data?.author && <TagList tags={[data.author]} />}
				</View>
				<View style={styles.infoSectionContainer}>
					<TextHeading>Genre</TextHeading>
					{data?.genres && <TagList tags={data.genres} />}
				</View>
				<View style={styles.infoSectionContainer}>
					<TextHeading>Description</TextHeading>
					<TextBody numberOfLines={5}>{data?.description}</TextBody>
				</View>
			</View>
		);
	};

	return (
		<ScrollView
			contentContainerStyle={{
				backgroundColor: colors.background,
			}}
		>
			{renderCover()}
			<View style={styles.container}>
				{renderTitle()}
				{renderInfo()}
				{data && <ChapterList id={data.id} />}
				<ButtonSecondary
					title="Show more"
					onPress={() => navigation.navigate('ChaptersScreen', { id })}
				/>
			</View>
		</ScrollView>
	);
}

export default MangaScreen;
