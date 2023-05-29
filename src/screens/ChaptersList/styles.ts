import styled from "styled-components/native";

import Colors from "../../colors";

export const SafeAreaContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${Colors.white};
`;

export const SectionHeaderTitle = styled.Text`
  font-size: 42px;
  font-family: InterBold;
  padding: 10px;
  color: ${Colors.lightBlue};
`;
