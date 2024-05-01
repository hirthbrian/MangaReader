import React from 'react';
import { Pressable } from 'react-native';

import { pad } from '../utils';

import styled from 'styled-components/native';

import Colors from '../colors';
import { ITEM_HEIGHT } from '../screens/ChaptersList';

export interface Props {
	title: string;
	index: number;
	onPress: Function;
	isChapterSelected: boolean;
}

export const Container = styled.View`
	flex-direction: row;
	padding: 10px;
	background-color: ${(props) =>
		props.pressed ? Colors.lightBlue : Colors.white};
`;

export const ItemNumber = styled.Text`
	font-size: 18px;
	padding-bottom: 5px;
	font-family: InterBlack;
	/* color: ${(props) =>
		props.isChapterSelected ? Colors.green : Colors.black}; */
`;

export const ItemTitle = styled.Text`
	font-size: 16px;
	font-family: InterSemiBold;
	/* color: ${(props) =>
		props.isChapterSelected ? Colors.green : Colors.black}; */
`;

export const ItemContainer = styled.View`
	flex: 1;
`;

export const ItemSelected = styled.View`
	height: ${ITEM_HEIGHT}px;
	position: absolute;
	width: 5px;
	background-color: ${Colors.green};
	border-top-right-radius: 4px;
	border-bottom-right-radius: 4px;
`;

export const ProgressContainer = styled.Pressable`
	width: 30px;
	height: 30px;
	position: absolute;
	align-items: center;
	justify-content: center;
`;

export const ImageContainer = styled.Image`
	width: 15px;
	height: 15px;
	position: absolute;
	tint-color: ${Colors.white};
`;

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
