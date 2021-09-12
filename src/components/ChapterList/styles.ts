import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import Colors from '../../colors';
import { HEADER_HEIGHT } from './consts';

export const SafeAreaContainer = styled.SafeAreaView`
  flex: 1;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: ${Colors.darkBlue};
  overflow: hidden;
`;

export const SectionHeaderContainer = styled.View`
  padding: 10px;
  height: ${HEADER_HEIGHT}px;
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
    marginTop: 50,
    marginHorizontal: 10,
    maxWidth: 500,
  }
});
