import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import GallerySwiper from 'react-native-gallery-swiper';
import Modal from 'react-native-modal';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';

import Colors from '../colors';
import Chapters from './Chapters';
import { pad } from '../utils';
import Loading from './Loading';

const URL = 'https://us-central1-onepiece-31470.cloudfunctions.net/getPages';
const listImage = require('../../assets/list.png');

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
  const footerRef = useRef(null);
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

  useEffect(() => {
    if (footerRef && footerRef.current) {
      showFooter ?
        footerRef.current.fadeIn(500) :
        footerRef.current.fadeOut(500);
    }
  }, [showFooter])

  const renderFooter = () => (
    <Pressable
      onPress={() => setShowChapters(true)}
    >
      <Animatable.View ref={footerRef}>
        <SafeAreaView style={styles.footerSafeAreaContainer}>
          <View style={styles.footerContainer}>
            <View style={styles.footerInfoContainer}>
              <Text
                numberOfLines={2}
                style={styles.footerChapterNumber}
              >
                {pad(index.toString(), 3)}
              </Text>
              <Text
                numberOfLines={1}
                style={styles.footerChapterTitle}
              >
                {title}
              </Text>
            </View>
            <Image
              source={listImage}
              style={styles.footerListImage}
            />
          </View>
          <View
            style={[
              styles.footerProgresBar,
              { width: `${progress * 100}%` },
            ]}
          />
        </SafeAreaView>
      </Animatable.View>
    </Pressable>
  );

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
          style={{ backgroundColor: Colors.white }}
          onSingleTapConfirmed={() => setShowFooter(!showFooter)}
          onPageSelected={(index) => setProgress((index + 1) / images.length)}
        />
      }
      {renderFooter()}
      {renderModal()}
    </View >
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
    marginTop: 100,
  },
  footerSafeAreaContainer: {
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    backgroundColor: Colors.darkBlue,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
  },
  footerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  footerInfoContainer: {
    flex: 1,
    paddingRight: 15,
  },
  footerChapterNumber: {
    fontSize: 16,
    fontFamily: 'InterBlack',
    color: Colors.white,
  },
  footerChapterTitle: {
    fontFamily: 'InterSemiBold',
    color: Colors.white,
  },
  footerListImage: {
    width: 20,
    height: 20,
    tintColor: Colors.white,
  },
  footerProgresBar: {
    height: 3,
    backgroundColor: Colors.white,
  }
});

export default Chapter;
