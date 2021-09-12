import styled from 'styled-components/native';

import Colors from '../../colors';
import { ITEM_HEIGHT } from '../ChapterList/consts';

export const Container = styled.View`
  background-color: ${props => props.pressed ? Colors.blue : Colors.darkBlue};
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
  height: ${ITEM_HEIGHT}px;
  padding: 10px 10px;
`;

export const ItemSelected = styled.View`
  height: 100%;
  position: absolute;
  width: 5px;
  background-color: ${Colors.green};
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
`;
