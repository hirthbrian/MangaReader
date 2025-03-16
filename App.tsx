import 'react-native-gesture-handler';
import '~ui/organisms/ActionSheets/sheets';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { SheetProvider } from 'react-native-actions-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { NavigationDarkTheme, NavigationLightTheme } from '~domain/colors';
import { MainNavigation } from '~infrastructure/navigation';

dayjs.extend(relativeTime);

const queryClient = new QueryClient();

function App() {
	const scheme = useColorScheme();

	const theme = useMemo(
		() => (scheme === 'dark' ? NavigationDarkTheme : NavigationLightTheme),
		[scheme],
	);

	return (
		<QueryClientProvider client={queryClient}>
			<GestureHandlerRootView>
				<SheetProvider>
					<MainNavigation theme={theme} />
				</SheetProvider>
			</GestureHandlerRootView>
		</QueryClientProvider>
	);
}

export default App;
