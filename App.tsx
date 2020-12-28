import React, { useState, useEffect } from 'react';
import {
  StatusBar,
} from 'react-native';

import axios from 'axios';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Chapter from './src/screens/Chapter';
import Loading from './src/components/Loading';

const URL = 'https://us-central1-onepiece-31470.cloudfunctions.net/getChapters';

function App() {
  const [chapters, setChapters] = useState([]);
  const [initialIndex, setInitialIndex] = useState(0);
  const [initialTitle, setInitialTitle] = useState('');

  const [loaded] = useFonts({
    InterMedium: require('./assets/fonts/Inter-Medium.otf'),
    InterSemiBold: require('./assets/fonts/Inter-SemiBold.otf'),
    InterBold: require('./assets/fonts/Inter-Bold.otf'),
    InterBlack: require('./assets/fonts/Inter-Black.otf'),
  });

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    axios(URL).then(async response => {
      const value = await AsyncStorage.getItem('@chapter') || 1;
      setChapters(response.data);
      // setChapters(sectionBySaga(response.data));
      setInitialIndex(Number(value));
      setInitialTitle(response.data[Number(value) - 1].title);
    });
  }, []);

  if (!loaded || initialIndex === 0 || initialTitle === '') {
    return <Loading />
  }

  return (
    <Chapter
      initialIndex={initialIndex}
      initialTitle={initialTitle}
      chapters={chapters}
    />
  );
}

export default App;
