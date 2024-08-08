import React from 'react';
import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native';
import { faker } from '@faker-js/faker';

import ColorsEnum from '../../domain/enum/ColorsEnum';
import Manga from '../molecules/Manga';
import Chapter from '../molecules/Chapter';

function Mock({ route }) {
	const { width } = useWindowDimensions();

	return (
		<View style={styles.container}>
			<View>
				<FlatList
					scrollEnabled={false}
					numColumns={2}
					columnWrapperStyle={{
						gap: 5,
					}}
					contentContainerStyle={{
						gap: 10,
						paddingHorizontal: 10,
						paddingVertical: 15,
					}}
					data={[...Array(2)].map(() => ({
						title: faker.lorem.words({ min: 1, max: 6 }),
						cover: faker.image.urlPicsumPhotos({
							width: 200,
							height: 200 * 1.4,
						}),
					}))}
					renderItem={({ item }) => (
						<Manga
							width={(width - 5 - 20) / 2}
							title={item.title}
							cover={item.cover}
						/>
					)}
					showsHorizontalScrollIndicator={false}
				/>
				<FlatList
					scrollEnabled={false}
					contentContainerStyle={{}}
					data={[...Array(2)].map(() => ({
						name: faker.lorem.words({ min: 1, max: 6 }),
						index: faker.number.int({ max: 1000 }),
						date: faker.date.anytime().toTimeString(),
					}))}
					renderItem={({ item }) => (
						<Chapter name={item.name} index={item.index} date={item.date} />
					)}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: ColorsEnum.BACKGROUND,
	},
});

export default Mock;
