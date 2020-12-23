import React, { useEffect } from 'react';
import {
  View,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Loading from './src/screens/Loading';
import Chapter from './src/screens/Chapter';
import Chapters from './src/screens/Chapters';

const Drawer = createDrawerNavigator();

function App() {
  useEffect(() => StatusBar.setBarStyle('dark-content'), []);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <Chapters {...props} />}
      >
        <Drawer.Screen name="Loading" component={Loading} />
        <Drawer.Screen name="Chapter" component={Chapter} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
