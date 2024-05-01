import React from 'react';
import { ActivityIndicator } from 'react-native';

import Colors from '../../colors';
import { Container } from './styles';

function Loading() {
	return (
		<Container>
			<ActivityIndicator size="large" color={Colors.blue} />
		</Container>
	);
}

export default Loading;
