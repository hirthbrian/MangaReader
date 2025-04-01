import 'react-native-gesture-handler';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
	createStaticNavigation,
	type StaticParamList,
} from '@react-navigation/native';
import {
	createNativeStackNavigator,
	type NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { Pressable } from 'react-native';

import {
	IconHouse,
	IconLibrary,
	IconSearch,
	IconSettings,
	IconUser,
} from '~ui/atoms/Icons';
import { TextBody, textStyles } from '~ui/atoms/Texts';
import AccountScreen from '~ui/screens/AccountScreen';
import ChaptersScreen from '~ui/screens/ChaptersScreen';
import ExternalReaderScreen from '~ui/screens/ExternalReaderScreen';
import HomeScreen from '~ui/screens/HomeScreen';
import LibraryScreen from '~ui/screens/LibraryScreen';
import MangaScreen from '~ui/screens/MangaScreen';
import ReaderScreen from '~ui/screens/ReaderScreen';
import SearchScreen from '~ui/screens/SearchScreen';

import { useTheme } from './hooks/useTheme';

export const screenOptions = (): NativeStackNavigationOptions => ({
	headerBackButtonDisplayMode: 'minimal',
	headerTitleStyle: textStyles.heading,
});

const HomeTabs = createBottomTabNavigator({
	screens: {
		Home: {
			screen: HomeScreen,
			options: {
				tabBarIcon: IconHouse,
			},
		},
		Search: {
			screen: SearchScreen,
			options: {
				tabBarIcon: IconSearch,
			},
		},
		Library: {
			screen: LibraryScreen,
			options: {
				tabBarIcon: IconLibrary,
			},
		},
		Account: {
			screen: AccountScreen,
			options: {
				tabBarIcon: IconUser,
			},
		},
	},
	screenOptions: {
		headerShown: false,
		tabBarLabel: TextBody,
	},
});

const SettingsHeaderIcon = () => {
	const { colors } = useTheme();

	return (
		<Pressable onPress={() => null}>
			<IconSettings size={22} color={colors.neutralLight} />
		</Pressable>
	);
};

const RootStack = createNativeStackNavigator({
	screens: {
		HomeScreen: {
			screen: HomeTabs,
			options: {
				title: 'Manga Reader',
				headerRight: SettingsHeaderIcon,
			},
		},
		SearchScreen: {
			screen: SearchScreen,
			options: {
				title: 'Search',
				presentation: 'modal',
			},
		},
		MangaScreen: {
			screen: MangaScreen,
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
		ExternalReaderScreen: {
			screen: ExternalReaderScreen,
			options: {
				title: '',
			},
		},
	},
	screenOptions,
});

export const MainNavigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}
