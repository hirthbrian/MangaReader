import React, { useRef, useEffect } from 'react';
import { View, Pressable } from 'react-native';

import {
  State,
  Directions,
  FlingGestureHandler,
  HandlerStateChangeEvent,
  FlingGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';

import { pad } from '../../utils';
import styles, {
  ListImage,
  Container,
  ChapterTitle,
  InfoContainer,
  ChapterNumber,
} from './styles';
import { FooterProps } from './types';

const listImage = require('../../../assets/list.png');

function Footer({
  index,
  title,
  isVisible,
  showChapters,
  onChapterChanged,
}: FooterProps) {
  const insets = useSafeAreaInsets();
  const footerRef = useRef<Animatable.View & View>(null);

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

  const onFling = (event: HandlerStateChangeEvent<FlingGestureHandlerEventPayload>, direction: Directions) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      onChapterChanged(index + (direction === Directions.LEFT ? 1 : -1));
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
        onHandlerStateChange={(event) => onFling(event, Directions.LEFT)}
      >
        <FlingGestureHandler
          direction={Directions.RIGHT}
          onHandlerStateChange={(e) => onFling(e, Directions.RIGHT)}
        >
          <Animatable.View
            useNativeDriver
            ref={footerRef}
            style={[styles.animatedContainer, {
              bottom: insets.bottom + 10,
            }]}
          >
            <Container>
              <ListImage source={listImage} />
              <InfoContainer>
                <ChapterNumber numberOfLines={2}>
                  {pad(index.toString(), 3)}
                </ChapterNumber>
                <ChapterTitle numberOfLines={1}>
                  {title}
                </ChapterTitle>
              </InfoContainer>
            </Container>
          </Animatable.View>
        </FlingGestureHandler>
      </FlingGestureHandler>
    </Pressable>
  );
}

export default Footer;
