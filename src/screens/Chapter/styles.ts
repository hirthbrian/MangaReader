import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import Colors from '../../colors';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${Colors.black};
`;

export const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
    marginTop: 100,
    marginHorizontal: 5,
  }
});