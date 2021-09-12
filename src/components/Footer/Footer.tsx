import React, { useRef, useEffect } from 'react';
import {
  Pressable,
  SafeAreaView,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import {
  State,
  Directions,
  FlingGestureHandler,
  HandlerStateChangeEvent,
  FlingGestureHandlerEventPayload,
} from 'react-native-gesture-handler';

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
          <SafeAreaView>
            <Animatable.View
              useNativeDriver
              ref={footerRef}
              style={styles.animatedContainer}
            >
              <Container>
                <InfoContainer>
                  <ChapterNumber numberOfLines={2}>
                    {pad(index.toString(), 3)}
                  </ChapterNumber>
                  <ChapterTitle numberOfLines={1}>
                    {title}
                  </ChapterTitle>
                </InfoContainer>
                <ListImage
                  source={listImage}
                />
              </Container>
            </Animatable.View>
          </SafeAreaView>
        </FlingGestureHandler>
      </FlingGestureHandler>
    </Pressable>
  );
}

export default Footer;
