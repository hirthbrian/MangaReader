import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import Colors from '../../colors';

export const SafeAreaContainer = styled.SafeAreaView`
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: ${Colors.darkBlue};
`;

export const SectionHeaderContainer = styled.View`
  padding: 10px;
  background-color: ${Colors.darkBlue};
`

export const SectionHeaderTitle = styled.Text`
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
