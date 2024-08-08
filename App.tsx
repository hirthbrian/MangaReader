import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Chapters from './src/ui/pages/Chapters';
import Mangas from './src/ui/pages/Mangas';
import Mock from './src/ui/pages/Mock';
import Reader from './src/ui/pages/Reader';
import RegularText from './src/ui/atoms/Texts/RegularText';
import ColorsEnum from './src/domain/enum/ColorsEnum';
import SemiBoldText from './src/ui/atoms/Texts/SemiBoldText';

const queryClient = new QueryClient();

function App() {
	useEffect(() => {
		StatusBar.setBarStyle('light-content');
	}, []);

	const Stack = createNativeStackNavigator();

	return (
		<QueryClientProvider client={queryClient}>
			<GestureHandlerRootView>
				<NavigationContainer>
					<Stack.Navigator
						screenOptions={{
							headerTintColor: ColorsEnum.PRIMARY,
							headerStyle: {
								backgroundColor: ColorsEnum.HEADER,
							},
							headerTitle: SemiBoldText,
						}}
					>
						{/* <Stack.Screen
							name="Mock"
							component={Mock}
							options={{ title: 'Mock' }}
						/> */}
						<Stack.Screen
							name="Mangas"
							component={Mangas}
							options={{ title: 'Mangas' }}
						/>
						<Stack.Screen
							name="Chapters"
							component={Chapters}
							options={{ title: 'One Piece' }}
						/>
						<Stack.Screen
							name="Reader"
							component={Reader}
							options={{ headerTransparent: true }}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</GestureHandlerRootView>
		</QueryClientProvider>
	);
}

export default App;
