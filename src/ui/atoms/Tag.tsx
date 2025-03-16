import { StyleSheet, View } from 'react-native';

import { useTheme } from '~infrastructure/hooks/useTheme';
import { TextBody } from '~ui/atoms/Texts';

const styles = StyleSheet.create({
	container: {
		paddingVertical: 4,
		paddingHorizontal: 8,
		borderRadius: 4,
	},
});

type Props = {
	label: string;
};

function Tag({ label }: Props) {
	const { colors } = useTheme();
	return (
		<View
			style={[styles.container, { backgroundColor: colors.backgroundLight }]}
		>
			<TextBody>{label}</TextBody>
		</View>
	);
}

export default Tag;
