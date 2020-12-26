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
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout'

import { pad } from '../utils';
import Colors from '../colors';

const closeImage = require('../../assets/close.png');
const ITEM_HEIGHT = 82;
const HEADER_HEIGHT = 95;

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

  const renderItem = ({ item: { index, title } }) => {
    const isChapterSelected = index === chapterSelected;

    return (
      <Pressable
        onPress={() => selectChapter(index, title)}
        style={({ pressed }) => [{ opacity: pressed ? 0.3 : 1 }]}
      >
        <View>
          {isChapterSelected && <View style={styles.sectionItemSelected} />}
          <View style={styles.sectionItemContainer}>
            <Text
              numberOfLines={2}
              style={[
                styles.sectionItemNumber,
                { color: isChapterSelected ? Colors.green : Colors.white },
              ]}
            >
              {pad(index.toString(), 3)}
            </Text>
            <Text
              numberOfLines={1}
              style={[
                styles.sectionItemTitle,
                { color: isChapterSelected ? Colors.green : Colors.white }
              ]}
            >
              {title}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  }

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeaderContainer}>
      <Text style={styles.sectionHeaderTitle}>
        {title}
      </Text>
      <View style={styles.sectionHeaderLine} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={onCloseModal}>
        <View style={styles.headerContainer}>
          <View style={{ width: 15 }} />
          <Text style={styles.headerTitle}>
            Chapitres
          </Text>
          <Image
            source={closeImage}
            style={styles.closeImage}
          />
        </View>
      </Pressable>
      <SectionList
        sections={chapters}
        renderItem={renderItem}
        keyExtractor={item => item.title}
        showsVerticalScrollIndicator={false}
        renderSectionHeader={renderSectionHeader}
        initialScrollIndex={initialChapter}
        getItemLayout={sectionListGetItemLayout({
          getItemHeight: () => ITEM_HEIGHT,
          getSectionHeaderHeight: () => HEADER_HEIGHT,
        })}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: Colors.darkBlue,
    paddingTop: 100,
  },
  headerContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: Colors.white,
    textAlign: 'center',
    fontFamily: 'InterBold'
  },
  closeImage: {
    tintColor: Colors.white,
    width: 15,
    height: 15,
  },
  sectionHeaderContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.darkBlue,
  },
  sectionHeaderTitle: {
    fontSize: 52,
    fontFamily: 'InterBold',
    color: Colors.white,
    paddingBottom: 10,
  },
  sectionHeaderLine: {
    height: 1,
    backgroundColor: Colors.whiteHalf,
  },
  sectionItemSelected: {
    height: '100%',
    position: 'absolute',
    width: 5,
    backgroundColor: Colors.green,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  sectionItemContainer: {
    height: ITEM_HEIGHT,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  sectionItemNumber: {
    fontSize: 20,
    paddingBottom: 5,
    fontFamily: 'InterBlack',
  },
  sectionItemTitle: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'InterSemiBold',
  },
});

export default Chapters;
