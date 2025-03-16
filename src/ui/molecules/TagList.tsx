import { StyleSheet, View } from 'react-native';

import Tag from '~ui/atoms/Tag';

const styles = StyleSheet.create({
	container: {
		gap: 5,
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
});

type Props = {
	tags: Array<string>;
};

function TagList({ tags }: Props) {
	return (
		<View style={styles.container}>
			{tags?.map((t) => (
				<Tag key={t} label={t} />
			))}
		</View>
	);
}

export default TagList;
