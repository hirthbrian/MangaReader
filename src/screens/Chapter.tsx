import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';

import Modal from 'react-native-modal';
import axios from 'axios';
import Carousel from 'react-native-snap-carousel';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Colors from '../colors';
import Chapters from './Chapters';
import Loading from '../components/Loading';
import Progress from '../components/Progress';
import Page from '../components/Page';
import Footer from '../components/Footer';

const URL = 'https://us-central1-onepiece-31470.cloudfunctions.net/getPages';

interface Chapter {
  index: number,
  title: string,
  url: string,
};

interface ChapterProps {
  initialIndex: number,
  initialTitle: string,
  chapters: Chapter[],
};

function Chapter({
  initialIndex,
  initialTitle,
  chapters,
}: ChapterProps) {
  const { width } = Dimensions.get('window');
  const [index, setIndex] = useState(initialIndex);
  const [title, setTitle] = useState(initialTitle);
  const [images, setImages] = useState([]);
  const [showChapters, setShowChapters] = useState(false);
  const [showFooter, setShowFooter] = useState(true);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setLoading(true);
    axios(`${URL}?index=${index}`)
      .then(response => {
        setImages(response.data);
        setLoading(false);
      });
    AsyncStorage.setItem('@chapter', index.toString());
  }, [index]);

  const renderModal = () => (
    <Modal
      isVisible={showChapters}
      onBackdropPress={() => setShowChapters(false)}
      animationInTiming={500}
      animationOutTiming={500}
      style={styles.modalContainer}
    >
      <Chapters
        chapters={chapters}
        onCloseModal={() => setShowChapters(false)}
        initialChapter={index}
        onChapterChanged={(index: number, title: string) => {
          setIndex(index);
          setTitle(title);
          setShowChapters(false)
        }}
      />
    </Modal>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.black }}>
      {loading ?
        <Loading /> :
        <Carousel
          items={images}
          data={images}
          renderItem={({ item: { uri } }) => (
            <Page
              uri={uri}
              onPress={() => setShowFooter(!showFooter)}
            />
          )}
          onSnapToItem={(index: number) => {
            const percentage = (index + 1) / images.length;
            if (index) setShowFooter(false);
            if (percentage === 1) setShowFooter(true);
            setProgress(percentage);
          }}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
          itemWidth={width + 10}
          sliderWidth={width}
        />
      }
      <Progress
        progress={progress}
      />
      <Footer
        index={index}
        title={title}
        isVisible={showFooter}
        showChapters={setShowChapters}
        onChapterChanged={(index: number) => {
          setIndex(index);
          setTitle(chapters[index - 1].title);
        }}
      />
      {renderModal()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
    marginTop: 100,
    marginHorizontal: 5,
  }
});

export default Chapter;
