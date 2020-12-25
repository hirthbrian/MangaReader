import React from 'react';
import {
  View,
  ActivityIndicator,
} from 'react-native';

import Colors from '../colors';

function Loading() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
      }}
    >
      <ActivityIndicator
        size="large"
        color={Colors.blue}
      />
    </View>
  );
}

export default Loading;
