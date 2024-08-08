import React from 'react';
import { ColorValue, Text, TextProps, TextStyle } from 'react-native';
import ColorsEnum from '../../../domain/enum/ColorsEnum';

export enum FontSizeEnum {
	SMALL = 12,
	REGULAR = 14,
	LARGE = 18,
}

export type TextBaseProps = {
	children: React.ReactNode;
	color?: ColorValue;
	fontSize?: number;
	style?: TextStyle;
	textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
} & TextProps;

const TextBase = ({
	children,
	color = ColorsEnum.TEXT,
	fontSize = FontSizeEnum.REGULAR,
	style = {},
	textAlign = 'auto',
	...props
}: TextBaseProps) => {
	return (
		<Text style={[style, { color, textAlign, fontSize }]} {...props}>
			{children}
		</Text>
	);
};

export default TextBase;
