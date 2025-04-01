import { DarkTheme, DefaultTheme } from '@react-navigation/native';

type ColorPalette = {
	backgroundDark: string;
	background: string;
	backgroundLight: string;
	neutral: string;
	neutralLight: string;
	primaryDark: string;
	primary: string;
	primaryLight: string;
	black: string;
};

type ColorPalettes = {
	light: ColorPalette;
	dark: ColorPalette;
};

export const colorPalettes: ColorPalettes = {
	light: {
		backgroundDark: '#C9CBCE',
		background: '#FFFFFF',
		backgroundLight: '#F0F1F2',
		neutral: '#242424',
		neutralLight: '#505050',
		primaryDark: '#CC5233',
		primary: '#FF6740',
		primaryLight: '#FF6666',
		black: '#000000',
	},
	dark: {
		backgroundDark: '#1D1D1D',
		background: '#191A1C',
		backgroundLight: '#2C2C2C',
		neutral: '#FFFFFF',
		neutralLight: '#D1D1D2',
		primaryDark: '#CC5233',
		primary: '#FF6740',
		primaryLight: '#D13839',
		black: '#000000',
	},
};

export const NavigationLightTheme: ReactNavigation.Theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: colorPalettes.light.primary,
		background: colorPalettes.light.background,
		card: colorPalettes.light.background,
		text: colorPalettes.light.neutral,
	},
};

export const NavigationDarkTheme: ReactNavigation.Theme = {
	...DarkTheme,
	colors: {
		...DarkTheme.colors,
		primary: colorPalettes.dark.primary,
		background: colorPalettes.dark.background,
		card: colorPalettes.dark.backgroundLight,
		text: colorPalettes.dark.neutral,
	},
};
