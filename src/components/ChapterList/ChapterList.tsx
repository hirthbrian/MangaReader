import React, { useState } from 'react';
import {
  View,
  Pressable,
  SectionList,
} from 'react-native';
import Modal from 'react-native-modal';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout'

import { sectionBySaga } from '../../utils';
import { Props } from './types';
import ChapterRowItem from '../ChapterRowItem';

import styles, {
  CloseImage,
  HeaderTitle,
  HeaderContainer,
  SafeAreaContainer,
  SectionHeaderLine,
  SectionHeaderTitle,
  SectionHeaderContainer,
} from './styles';

const closeImage = require('../../../assets/close.png');
const ITEM_HEIGHT = 82;
const HEADER_HEIGHT = 95;

function ChapterList({
  chapters,
  isVisible,
  initialChapter,
  onChapterChanged,
  onClose,
}: Props) {
  const [chapterSelected, setChapterSelected] = useState(initialChapter);

  const selectChapter = (index: number, title: string) => {
    setChapterSelected(index);
    onChapterChanged(index, title)
  }

  const renderItem = ({ item }) => (
    <ChapterRowItem
      title={item.title}
      index={item.index}
      onPress={selectChapter}
      isChapterSelected={item.index === chapterSelected}
    />
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <SectionHeaderContainer>
      <SectionHeaderTitle>
        {title}
      </SectionHeaderTitle>
      <SectionHeaderLine />
    </SectionHeaderContainer>
  );

  return (
    <Modal
      useNativeDriver
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modalContainer}
      hideModalContentWhileAnimating
    >
      <SafeAreaContainer>
        <Pressable onPress={onClose}>
          <HeaderContainer>
            <View style={{ width: 15 }} />
            <HeaderTitle>
              Chapitres
            </HeaderTitle>
            <CloseImage
              source={closeImage}
            />
          </HeaderContainer>
        </Pressable>
        <SectionList
          sections={sectionBySaga(chapters)}
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
      </SafeAreaContainer>
    </Modal>
  );
}

export default ChapterList;
