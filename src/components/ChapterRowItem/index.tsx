import React from 'react';
import { Pressable } from 'react-native';

import { pad } from '../../utils';
import { Props } from './types';

import {
	Container,
	ItemTitle,
	ItemNumber,
	ItemSelected,
	ItemContainer,
} from './styles';

function ChapterRowItem({ title, index, onPress, isChapterSelected }: Props) {
	return (
		<Pressable onPress={() => onPress(index, title)}>
			{({ pressed }) => (
				<Container pressed={pressed}>
					{isChapterSelected && <ItemSelected />}
					<ItemContainer>
						<ItemNumber numberOfLines={2} isChapterSelected={isChapterSelected}>
							{pad(index.toString(), 3)}
						</ItemNumber>
						<ItemTitle numberOfLines={1} isChapterSelected={isChapterSelected}>
							{title}
						</ItemTitle>
					</ItemContainer>
				</Container>
			)}
		</Pressable>
	);
}

export default ChapterRowItem;
