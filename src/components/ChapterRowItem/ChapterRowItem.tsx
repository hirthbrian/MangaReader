import React from 'react';
import { View, Pressable } from 'react-native';
import { Circle } from 'react-native-progress';

import { pad } from '../../utils';
import { Props } from './types';

import {
  Container,
  ItemTitle,
  ItemNumber,
  ItemSelected,
  ItemContainer,
  ImageContainer,
  ProgressContainer,
} from './styles';
import Colors from '../../colors';

const imageIcon = require('../../../assets/download.png');

function ChapterRowItem({
  title,
  index,
  onPress,
  isChapterSelected,
}: Props) {

  const onPressDownload = () => {
    console.log('pressDownload');
  }

  return (
    <Pressable onPress={() => onPress(index, title)}>
      {({ pressed }) => (
        <Container pressed={pressed}>
          {isChapterSelected && <ItemSelected />}
          <ItemContainer>
            <ItemNumber
              numberOfLines={2}
              isChapterSelected={isChapterSelected}
            >
              {pad(index.toString(), 3)}
            </ItemNumber>
            <ItemTitle
              numberOfLines={1}
              isChapterSelected={isChapterSelected}
            >
              {title}
            </ItemTitle>
          </ItemContainer>
          <View
            style={{ width: 30, height: 30}}
          >
            <ProgressContainer onPress={onPressDownload}>
              <ImageContainer source={imageIcon} />
              <Circle
                size={30}
                progress={0.4}
                borderWidth={0}
                // borderColor={Colors.darkBlue}
                color={Colors.green}
                style={{ position: 'absolute' }}
              />
            </ProgressContainer>
          </View>
        </Container>
      )}
    </Pressable>
  );
}

export default ChapterRowItem;
