import React, { useState, useEffect } from 'react';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

const URL = 'https://us-central1-onepiece-31470.cloudfunctions.net/getChapters';

function Chapters(props) {
  const [chapterSelected, setChapterSelected] = useState(1);
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('@chapter')
      .then((value) => Number(value))
      .then((value) => selectChapter(value))
      .catch(() => selectChapter(1));

    axios(URL).then(response => setChapters(response.data));
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('@chapter', chapterSelected.toString());
  }, [chapterSelected])

  const selectChapter = (index: number) => {
    setChapterSelected(index);
    props.navigation.navigate('Chapter', { index })
  }

  return (
    <DrawerContentScrollView {...props}>
      {chapters.map(({ title, index }) => (
        <DrawerItem
          key={index}
          focused={index === chapterSelected}
          label={`${index}: ${title}`}
          onPress={() => selectChapter(index)}
        />
      ))}
    </DrawerContentScrollView>
  );
}

export default Chapters;
