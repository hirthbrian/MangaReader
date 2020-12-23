import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  Modal,
  Pressable,
  Dimensions,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Loading from './Loading';

function Page({ uri }) {
  const { width } = Dimensions.get('window');
  const [ratio, setRatio] = useState(1.5);
  const [fullScreen, setFullScreen] = useState(false);

  useEffect(() => {
    Image.getSize(uri, (width, height) => setRatio(height / width));
  }, []);

  const renderModal = () => (
    <Modal visible={fullScreen}>
      <ImageViewer
        useNativeDriver
        enableSwipeDown
        onClick={() => setFullScreen(false)}
        onSwipeDown={() => setFullScreen(false)}
        renderIndicator={() => <View />}
        loadingRender={() => <Loading />}
        imageUrls={[{ url: uri }]}
      />
    </Modal>
  )

  return (
    <View>
      {renderModal()}
      <Pressable
        onPress={() => setFullScreen(true)}
      >
        <Image
          source={{ uri }}
          style={{
            height: width * ratio
          }}
        />
      </Pressable>
    </View>
  );
}

export default Page;
