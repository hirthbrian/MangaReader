import { useColorScheme } from 'react-native';

import { colorPalettes } from '~domain/colors';

export const useTheme = () => {
	const colorScheme = useColorScheme();

	return {
		darkMode: colorScheme === 'dark',
		colors: colorScheme === 'dark' ? colorPalettes.dark : colorPalettes.light,
	};
};
