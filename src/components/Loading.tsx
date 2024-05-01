import React from 'react';
import { ActivityIndicator } from 'react-native';

import Colors from '../colors';

import styled from 'styled-components/native';

export const Container = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
	background-color: ${Colors.white};
`;

function Loading() {
	return (
		<Container>
			<ActivityIndicator size="large" color={Colors.blue} />
		</Container>
	);
}

export default Loading;
