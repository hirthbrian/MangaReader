import Reactotron, { networking } from 'reactotron-react-native';

Reactotron.configure()
	.useReactNative()
	// .use(
	// 	networking({
	// 		ignoreUrls: /symbolicate/,
	// 	}),
	// )
	.connect();
