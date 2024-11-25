import React from 'react';
import { StyleSheet } from 'react-native';
import TextBase, { TextBaseProps } from './TextBase';

export type RegularTextProps = {
	children: React.ReactNode;
} & TextBaseProps;

const RegularText = ({ children, ...props }: RegularTextProps) => {
	return (
		<TextBase {...props} style={[styles.text, props.style]}>
			{children}
		</TextBase>
	);
};

const styles = StyleSheet.create({
	text: {
		fontFamily: 'Poppins-Regular',
		fontWeight: '400',
	},
});

export default RegularText;
