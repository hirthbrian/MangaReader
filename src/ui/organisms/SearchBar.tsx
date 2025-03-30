import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	type StyleProp,
	View,
	type ViewStyle,
} from 'react-native';
import { useDebounce } from 'use-debounce';

import { useSearchContext } from '~infrastructure/context/SearchContext';
import { searchManga } from '~infrastructure/fetch';
import { useTheme } from '~infrastructure/hooks/useTheme';
import { IconSearch } from '~ui/atoms/Icons';
import TextInput from '~ui/atoms/TextInput';

type Props = {
	style?: StyleProp<ViewStyle>;
};

function SearchBar({ style }: Props) {
	const searchContext = useSearchContext();
	const [text, setText] = useState('');
	const [debouncedText] = useDebounce(text, 500);
	const { colors } = useTheme();

	const { data, isLoading } = useQuery({
		queryKey: ['searchManga', debouncedText],
		queryFn: () => searchManga(debouncedText),
	});

	useEffect(() => {
		if (data?.length) {
			searchContext.setResults(data);
		}
	}, [data, searchContext, searchContext.setResults]);

	const renderLeftElement = () => {
		if (isLoading) {
			return <ActivityIndicator size={18} color={colors.neutral} />;
		}
		return <IconSearch size={18} color={colors.neutral} />;
	};

	return (
		<View style={style}>
			<TextInput
				autoFocus
				value={text}
				onChangeText={setText}
				placeholder="Search"
				LeftElement={renderLeftElement}
			/>
		</View>
	);
}

export default SearchBar;
