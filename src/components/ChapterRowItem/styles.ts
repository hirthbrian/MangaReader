import styled from 'styled-components/native';

import Colors from '../../colors';

const ITEM_HEIGHT = 82;

export const Container = styled.View`
  background-color: ${props => props.pressed ? Colors.blue : Colors.darkBlue};
`;

export const SectionItemNumber = styled.Text`
  font-size: 20px;
  padding-bottom: 5px;
  font-family: InterBlack;
  color: ${props => props.isChapterSelected ? Colors.green : Colors.white};
`;

export const SectionItemTitle = styled.Text`
  flex: 1;
  font-size: 18px;
  font-family: InterSemiBold;
  color: ${props => props.isChapterSelected ? Colors.green : Colors.white};
`;

export const SectionItemContainer = styled.View`
  height: ${ITEM_HEIGHT}px;
  padding: 15px 20px;
`;

export const SectionItemSelected = styled.View`
  height: 100%;
  position: absolute;
  width: 5px;
  background-color: ${Colors.green};
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
`;
