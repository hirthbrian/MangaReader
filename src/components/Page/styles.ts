import styled from 'styled-components/native';

import { ContainerProps } from './types';

export const Container = styled.View`
  width: ${(props: ContainerProps) => props.width}px;
  height: ${(props: ContainerProps) => props.height}px;
  justify-content: center;
`;
