import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { MangaStatusType } from '~domain/types';
import { useTheme } from '~infrastructure/hooks/useTheme';
import { TextBody } from '~ui/atoms/Texts';

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 5,
		alignItems: 'center',
		paddingVertical: 4,
		paddingHorizontal: 8,
		borderRadius: 4,
	},
	dot: {
		width: 8,
		height: 8,
		borderRadius: 4,
	},
});

type Props = {
	status: MangaStatusType;
};

const capitalized = (word: string) =>
	word.charAt(0).toUpperCase() + word.slice(1);

function StatusTag({ status }: Props) {
	const { colors } = useTheme();

	const dotColor = useMemo(() => {
		switch (status) {
			case 'ongoing':
				return '#04D000';
			case 'completed':
				return '#00C9F5';
			case 'hiatus':
				return '#DA7500';
			case 'cancelled':
				return '#FF4040';
		}
	}, [status]);

	return (
		<View
			style={[
				styles.container,
				{
					backgroundColor: colors.backgroundLight,
				},
			]}
		>
			<View
				style={[
					styles.dot,
					{
						backgroundColor: dotColor,
					},
				]}
			/>
			<TextBody>{capitalized(status)}</TextBody>
		</View>
	);
}

export default StatusTag;
