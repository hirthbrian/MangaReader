import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import Colors from '../../colors';
import { HEADER_HEIGHT } from './consts';

export const SafeAreaContainer = styled.SafeAreaView`
  flex: 1;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: ${Colors.darkBlue};
`;

export const SectionHeaderContainer = styled.View`
  height: ${HEADER_HEIGHT}px;
  padding: 10px;
  background-color: ${Colors.darkBlue};
`

export const SectionHeaderTitle = styled.Text`
  flex: 1;
  font-size: 42px;
  font-family: InterBold;
  color: ${Colors.white};
`

export default StyleSheet.create({
  modalContainer: {
    margin: 0,
    marginRight: 50,
  }
});
