import styled from 'styled-components';
import Animated from 'react-native-reanimated';

import Colors from '../../colors';

export const ProgressBar = styled(Animated.View)`
  height: 2px;
  background-color: ${Colors.blue};
`;