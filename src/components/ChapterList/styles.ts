import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import Colors from '../../colors';

export const SafeAreaContainer = styled.SafeAreaView`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: ${Colors.darkBlue};
  padding-top: 100px;
`;

export const HeaderContainer = styled.View`
  align-items: flex-end;
  padding: 15px 20px;
  flex-direction: row;
  justify-content: space-between;
`

export const HeaderTitle = styled.Text`
  color: ${Colors.white};
  text-align: center;
  font-family: InterBold;
`

export const CloseImage = styled.Image`
  tint-color: ${Colors.white};
  width: 15px;
  height: 15px;
`

export const SectionHeaderContainer = styled.View`
  padding: 10px 20px;
  background-color: ${Colors.darkBlue};
`

export const SectionHeaderTitle = styled.Text`
  font-size: 52px;
  font-family: InterBold;
  color: ${Colors.white};
  padding-bottom: 10px;
`

export const SectionHeaderLine = styled.View`
  height: 1px;
  background-color: ${Colors.whiteHalf};
`

export default StyleSheet.create({
  modalContainer: {
    margin: 0,
    marginTop: 100,
  }
});
