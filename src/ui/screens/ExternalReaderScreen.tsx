import { type StaticScreenProps } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

type Props = StaticScreenProps<{
	url: string;
}>;

function ExternalReaderScreen({ route }: Props) {
	const url = route?.params?.url;

	return <WebView source={{ uri: url }} style={styles.container} />;
}

export default ExternalReaderScreen;
