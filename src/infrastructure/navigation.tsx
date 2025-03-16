import 'react-native-gesture-handler';

import {
	createStaticNavigation,
	type StaticParamList,
} from '@react-navigation/native';
import {
	createNativeStackNavigator,
	type NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import { textStyles } from '~ui/atoms/Texts';
import ChaptersScreen from '~ui/screens/ChaptersScreen';
import HomeScreen from '~ui/screens/HomeScreen';
import MangaScreen from '~ui/screens/MangaScreen';
import ReaderScreen from '~ui/screens/ReaderScreen';
import SearchScreen from '~ui/screens/SearchScreen';

export const screenOptions = (): NativeStackNavigationOptions => ({
	headerBackButtonDisplayMode: 'minimal',
	headerTitleStyle: textStyles.heading,
	// headerRight: ProfileButton,
});

const MainStack = createNativeStackNavigator({
	screens: {
		HomeScreen: {
			screen: HomeScreen,
			options: {
				title: 'Manga Reader',
			},
		},
		SearchScreen: {
			screen: SearchScreen,
			options: {
				title: 'Search',
				animation: 'none',
			},
		},
		MangaScreen: {
			screen: MangaScreen,
			options: {
				title: 'A Messy Fairy Tale',
				// headerTransparent: true,
			},
		},
		ChaptersScreen: {
			screen: ChaptersScreen,
			options: {
				title: 'Chapters',
			},
		},
		ReaderScreen: {
			screen: ReaderScreen,
			options: {
				title: '',
				headerTransparent: true,
				headerStyle: {
					backgroundColor: 'transparent',
				},
			},
		},
	},
	screenOptions,
});

export const MainNavigation = createStaticNavigation(MainStack);

type RootStackParamList = StaticParamList<typeof MainStack>;

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}
