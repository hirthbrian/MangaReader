import React, { useState } from 'react';
import { SectionList } from 'react-native';
import Modal from 'react-native-modal';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout'

import { sectionBySaga } from '../../utils';
import { Props } from './types';
import ChapterRowItem from '../ChapterRowItem';

import styles, {
  SafeAreaContainer,
  SectionHeaderTitle,
  SectionHeaderContainer,
} from './styles';
import { HEADER_HEIGHT, ITEM_HEIGHT } from './consts';

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
      <SectionHeaderTitle
        numberOfLines={1}
      >
        {title}
      </SectionHeaderTitle>
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
