import React from 'react';
import { StyleSheet } from 'react-native';
import TextBase, { TextBaseProps } from './TextBase';

export type SemiBoldTextProps = {
	children: React.ReactNode;
} & TextBaseProps;

const SemiBoldText = ({ children, ...props }: SemiBoldTextProps) => {
	return (
		<TextBase {...props} style={[styles.text, props.style]}>
			{children}
		</TextBase>
	);
};

const styles = StyleSheet.create({
	text: {
		fontFamily: 'Poppins-SemiBold',
		fontWeight: '600',
	},
});

export default SemiBoldText;
