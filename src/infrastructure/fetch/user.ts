import 'react-native-url-polyfill/auto';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

import type { IUserCredentials } from '~domain/entities/user';

import { SUPABASE_ANON_KEY, SUPABASE_URL } from '../../../secret';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
	auth: {
		storage: AsyncStorage,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
});

export const userSignUp = ({ email, password }: IUserCredentials) => {
	return supabase.auth.signUp({ email, password });
};

export const userSignIn = ({ email, password }: IUserCredentials) => {
	return supabase.auth.signInWithPassword({ email, password });
};
