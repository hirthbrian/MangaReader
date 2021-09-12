import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import Colors from '../../colors';

export const Container = styled.View`
  align-items: center;
  flex-direction: row;
  padding: 10px 15px;
`

export const InfoContainer = styled.View`
  flex: 1;
  padding-left: 15px;
`

export const ChapterNumber = styled.Text`
  font-size: 16px;
  font-family: InterBlack;
  color: ${Colors.white};
`

export const ChapterTitle = styled.Text`
  font-family: InterSemiBold;
  color: ${Colors.white};
`

export const ListImage = styled.Image`
  width: 20px;
  height: 20px;
  tint-color: ${Colors.white};
`

export const ProgresBar = styled.View`
  height: 3px;
  background-color: ${Colors.white};
`
export default StyleSheet.create({
  animatedContainer: {
    left: 0,
    right: 0,
    bottom: 10,
    position: 'absolute',
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: Colors.black,
    backgroundColor: Colors.darkBlue,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    maxWidth: 500,
  },
});
