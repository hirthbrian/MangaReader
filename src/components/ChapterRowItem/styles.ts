import styled from 'styled-components/native';

import Colors from '../../colors';
import { ITEM_HEIGHT } from '../ChapterList/consts';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px 10px;
  background-color: ${props => props.pressed ? Colors.blue : Colors.darkBlue};
  height: ${ITEM_HEIGHT}px;
`;

export const ItemNumber = styled.Text`
  flex: 1;
  font-size: 18px;
  padding-bottom: 5px;
  font-family: InterBlack;
  color: ${props => props.isChapterSelected ? Colors.green : Colors.white};
`;

export const ItemTitle = styled.Text`
  flex: 1;
  font-size: 16px;
  font-family: InterSemiBold;
  color: ${props => props.isChapterSelected ? Colors.green : Colors.white};
`;

export const ItemContainer = styled.View`
  flex: 1;
`;

export const ItemSelected = styled.View`
  height: ${ITEM_HEIGHT}px;
  position: absolute;
  width: 5px;
  background-color: ${Colors.green};
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
`;

export const ProgressContainer = styled.Pressable`
  width: 30px;
  height: 30px;
  position: absolute;
  align-items: center;
  justify-content: center;
`;

export const ImageContainer = styled.Image`
  width: 15px;
  height: 15px;
  position: absolute;
  tint-color: ${Colors.white};
`;
