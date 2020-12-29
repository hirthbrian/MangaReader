import React from 'react';
import {
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';

interface PageProps {
  uri: string,
  onPress: () => void,
};

function Page({ uri, onPress }: PageProps) {
  const { width, height } = Dimensions.get('window');

  return (
    <Pressable
      onPress={onPress}
      style={styles.container}
    >
      <Image
        source={{ uri }}
        resizeMode='contain'
        style={{
          height,
          width,
        }}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Page;
