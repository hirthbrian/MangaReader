import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
} from 'react-native';

import axios from 'axios';
import Page from './Page';

const URL = 'https://us-central1-onepiece-31470.cloudfunctions.net/getPages';

function Chapter({ route }) {
  const { index } = route.params;
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios(`${URL}?index=${index}`)
      .then(response => {
        setImages(response.data);
      });
  }, [index]);

  const renderItem = ({ item: { uri } }) => (
    <Page
      uri={uri}
    />
  )

  const renderSeparator = () => <View style={{ height: 10 }} />

  return (
    <FlatList
      data={images}
      renderItem={renderItem}
      ItemSeparatorComponent={renderSeparator}
      keyExtractor={item => item.uri}
    />
  );
}

export default Chapter;
