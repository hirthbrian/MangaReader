import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import GallerySwiper from 'react-native-gallery-swiper';
import Modal from 'react-native-modal';
import axios from 'axios';

import Colors from '../colors';
import Chapters from './Chapters';
import Loading from '../components/Loading';
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
  }, [index]);

  const renderModal = () => (
    <Modal
      useNativeDriver
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
    <View style={{ flex: 1 }}>
      {loading ?
        <Loading /> :
        <GallerySwiper
          images={images}
          pageMargin={20}
          // style={{ backgroundColor: Colors.white }}
          onSingleTapConfirmed={() => setShowFooter(!showFooter)}
          onPageSelected={(index) => {
            const percentage = ((index + 1) / images.length) * 100;
            if (index) setShowFooter(false);
            if (percentage === 100) setShowFooter(true);
            setProgress(percentage);
          }}
        />
      }
      <Footer
        index={index}
        title={title}
        progress={progress}
        isVisible={showFooter}
        showChapters={setShowChapters}
        onChapterChanged={(index: number) => {
          setIndex(index);
          chapters.map(section => section.data.map(chapter => {
            if (chapter.index === index) setTitle(chapter.title)
          }));
          // setTitle(chapters[index].title);
        }}
      />
      {renderModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
    marginTop: 100,
  }
});

export default Chapter;
