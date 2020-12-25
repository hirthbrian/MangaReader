import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  SectionList,
  SafeAreaView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { pad } from '../utils';
import Colors from '../colors';

const closeImage = require('../../assets/close.png');

function Chapters({
  chapters,
  initialChapter,
  onChapterChanged,
  onCloseModal,
}) {
  const [chapterSelected, setChapterSelected] = useState(initialChapter);

  useEffect(() => {
    AsyncStorage.setItem('@chapter', chapterSelected.toString());
  }, [chapterSelected])

  const selectChapter = (index: number, title: string) => {
    setChapterSelected(index);
    onChapterChanged(index, title)
  }

  const renderItem = ({ item: { index, title } }) => (
    <Pressable
      onPress={() => selectChapter(index, title)}
    >
      <View>
        {index === chapterSelected && (
          <View
            style={{
              height: '100%',
              position: 'absolute',
              width: 5,
              backgroundColor: Colors.green,
              borderTopRightRadius: 4,
              borderBottomRightRadius: 4,
            }}
          />
        )}
        <View
          style={{
            paddingVertical: 15,
            paddingHorizontal: 20,
          }}
        >
          <Text
            numberOfLines={2}
            style={{
              fontSize: 20,
              paddingBottom: 5,
              fontFamily: 'InterBlack',
              color: index === chapterSelected ? Colors.green : Colors.white,
            }}
          >
            {pad(index.toString(), 3)}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              fontSize: 18,
              fontFamily: 'InterSemiBold',
              color: index === chapterSelected ? Colors.green : Colors.white,
            }}
          >
            {title}
          </Text>
        </View>
      </View>
    </Pressable>
  )

  const renderSectionHeader = ({ section: { title } }) => (
    <View
      style={{
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: Colors.darkBlue,
      }}
    >
      <Text
        style={{
          fontSize: 52,
          fontFamily: 'InterBold',
          color: Colors.white,
          paddingBottom: 10,
        }}
      >
        {title}
      </Text>
      <View
        style={{
          height: 1,
          backgroundColor: Colors.whiteHalf,
        }}
      />
    </View >
  )

  return (
    <SafeAreaView
      style={{
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: Colors.darkBlue,
        paddingTop: 100,
      }}
    >
      <Pressable
        onPress={onCloseModal}
      >
        <View
          style={{
            alignItems: 'flex-end',
            paddingHorizontal: 20,
            paddingVertical: 15,
            // borderBottomWidth: StyleSheet.hairlineWidth,
            // borderBottomColor: Colors.whiteHalf,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ width: 15 }} />
          <Text
            style={{
              color: Colors.white,
              textAlign: 'center',
              fontFamily: 'InterBold'
            }}
          >
            Chapitre
          </Text>
          <Image
            source={closeImage}
            style={{
              tintColor: Colors.white,
              width: 15,
              height: 15,
            }}
          />
        </View>
      </Pressable>
      <SectionList
        sections={chapters}
        // initialScrollIndex={initialChapter - 1}
        renderItem={renderItem}
        keyExtractor={item => item.title}
        // stickySectionHeadersEnabled={false}
        renderSectionHeader={renderSectionHeader}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

export default Chapters;
