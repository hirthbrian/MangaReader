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
import { FlingGestureHandler, Directions, State } from 'react-native-gesture-handler';

import Colors from '../colors';
import { pad } from '../utils';

const listImage = require('../../assets/list.png');

interface FooterProps {
  index: number,
  title: string,
  isVisible: boolean,
  showChapters: Function,
  onChapterChanged: Function,
}

function Footer({
  index,
  title,
  isVisible,
  showChapters,
  onChapterChanged,
}: FooterProps) {
  const footerRef = useRef(null);

  useEffect(() => {
    isVisible ?
      footerRef?.current?.transitionTo({ translateY: 0 }) :
      footerRef?.current?.transitionTo({ translateY: 120 });
  }, [isVisible])

  const pressInAnimation = () => {
    footerRef?.current?.transitionTo({ scale: 1.03 });
  }

  const pressOutAnimation = () => {
    footerRef?.current?.transitionTo({ scale: 1 });
  }

  const onFlingLeft = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      onChapterChanged(index + 1);
    }
  };

  const onFlingRight = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      onChapterChanged(index - 1);
    }
  };

  return (
    <Pressable
      onPress={() => showChapters(true)}
      onPressIn={pressInAnimation}
      onPressOut={pressOutAnimation}
    >
      <FlingGestureHandler
        direction={Directions.LEFT}
        onHandlerStateChange={onFlingLeft}
      >
        <FlingGestureHandler
          direction={Directions.RIGHT}
          onHandlerStateChange={onFlingRight}
        >
          <SafeAreaView>
            <Animatable.View
              useNativeDriver
              ref={footerRef}
              style={styles.animatedContainer}
            >
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
            </Animatable.View>
          </SafeAreaView>
        </FlingGestureHandler>
      </FlingGestureHandler>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  animatedContainer: {
    left: 0,
    right: 0,
    bottom: 10,
    position: 'absolute',
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: Colors.black,
    backgroundColor: Colors.darkBlue,
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
