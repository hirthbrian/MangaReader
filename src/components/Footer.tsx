import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import Colors from '../colors';
import { pad } from '../utils';

const listImage = require('../../assets/list.png');

interface FooterProps {
  index: number,
  title: string,
  progress: number,
  isVisible: boolean,
  showChapters: Function,
}

function Footer({
  index,
  title,
  progress,
  isVisible,
  showChapters,
}: FooterProps) {
  const footerRef = useRef(null);

  useEffect(() => {
    if (footerRef && footerRef.current) {
      isVisible ?
        footerRef.current.fadeIn(500) :
        footerRef.current.fadeOut(500);
    }
  }, [isVisible])

  return (
    <Pressable onPress={() => showChapters(true)}>
      <Animatable.View ref={footerRef}>
        <SafeAreaView style={styles.safeAreaContainer}>
          <View style={styles.container}>
            <View style={styles.infoContainer}>
              <Text
                numberOfLines={2}
                style={styles.chapterNumber}
              >
                {pad(index.toString(), 3)}
              </Text>
              <Text
                numberOfLines={1}
                style={styles.chapterTitle}
              >
                {title}
              </Text>
            </View>
            <Image
              source={listImage}
              style={styles.listImage}
            />
          </View>
          <View
            style={[
              styles.progresBar,
              { width: `${progress}%` },
            ]}
          />
        </SafeAreaView>
      </Animatable.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
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
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  infoContainer: {
    flex: 1,
    paddingRight: 15,
  },
  chapterNumber: {
    fontSize: 16,
    fontFamily: 'InterBlack',
    color: Colors.white,
  },
  chapterTitle: {
    fontFamily: 'InterSemiBold',
    color: Colors.white,
  },
  listImage: {
    width: 20,
    height: 20,
    tintColor: Colors.white,
  },
  progresBar: {
    height: 3,
    backgroundColor: Colors.white,
  }
});

export default Footer;
