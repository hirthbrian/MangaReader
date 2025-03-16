import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	type TextInput as TextInputNative,
	View,
} from 'react-native';

import { userSignIn } from '~infrastructure/fetch/user';
import ButtonPrimary from '~ui/atoms/ButtonPrimary';
import TextInput from '~ui/atoms/TextInput';
import { TextBody } from '~ui/atoms/Texts';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 20,
		paddingHorizontal: 15,
		justifyContent: 'center',
	},
	textInputContainer: {
		gap: 10,
	},
});

function SignInScreen() {
	const emailRef = useRef<TextInputNative | null>(null);
	const [email, setEmail] = useState('');
	const passwordRef = useRef<TextInputNative | null>(null);
	const [password, setPassword] = useState('');

	const mutation = useMutation({
		mutationFn: userSignIn,
	});

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<View style={styles.textInputContainer}>
				<TextInput
					ref={emailRef}
					placeholder="Email"
					keyboardType="email-address"
					value={email}
					onChangeText={setEmail}
					onSubmitEditing={() => passwordRef.current?.focus()}
				/>
				<TextInput
					ref={passwordRef}
					secureTextEntry
					placeholder="Password"
					value={password}
					onChangeText={setPassword}
					onSubmitEditing={() => mutation.mutate({ email, password })}
				/>
			</View>
			<ButtonPrimary
				title="Sign In"
				loading={mutation.isPending}
				onPress={() => mutation.mutate({ email, password })}
			/>
			<TextBody onPress={() => null}>Don't have an account?</TextBody>
		</KeyboardAvoidingView>
	);
}

export default SignInScreen;
