import React, { useEffect } from 'react';
import { Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import {
  State,
  Directions,
  FlingGestureHandler,
  HandlerStateChangeEvent,
  FlingGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = isVisible ? 0 : 120;
  }, [isVisible])

  const pressInAnimation = () => { scale.value = 1.03 }

  const pressOutAnimation = () => { scale.value = 1 }

  const onFling = (event: HandlerStateChangeEvent<FlingGestureHandlerEventPayload>, direction: Directions) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      onChapterChanged(index + (direction === Directions.LEFT ? 1 : -1));
    }
  };

  const aes = useAnimatedStyle(() => ({
    transform: [
      { translateY: withSpring(translateY.value) },
      { scale: withSpring(scale.value) },
    ],
  }));

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
          <Animated.View
            style={[aes, styles.animatedContainer, {
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
          </Animated.View>
        </FlingGestureHandler>
      </FlingGestureHandler>
    </Pressable>
  );
}

export default Footer;
