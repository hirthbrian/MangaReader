import React from 'react';
import { Pressable } from 'react-native';

import { pad } from '../../utils';
import { Props } from './types';

import {
  Container,
  SectionItemTitle,
  SectionItemNumber,
  SectionItemSelected,
  SectionItemContainer,
} from './styles';

function ChapterRowItem({
  title,
  index,
  onPress,
  isChapterSelected,
}: Props) {
  return (
    <Pressable onPress={() => onPress(index, title)}>
      {({ pressed }) => (
        <Container pressed={pressed}>
          {isChapterSelected && <SectionItemSelected />}
          <SectionItemContainer>
            <SectionItemNumber
              numberOfLines={2}
              isChapterSelected={isChapterSelected}
            >
              {pad(index.toString(), 3)}
            </SectionItemNumber>
            <SectionItemTitle
              numberOfLines={1}
              isChapterSelected={isChapterSelected}
            >
              {title}
            </SectionItemTitle>
          </SectionItemContainer>
        </Container>
      )}
    </Pressable>
  );
}

export default ChapterRowItem;
