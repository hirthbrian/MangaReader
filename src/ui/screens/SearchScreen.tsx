import { useState } from 'react';
import { StyleSheet } from 'react-native';

import type { IMangaShort } from '~domain/entities';
import { SearchContext } from '~infrastructure/context/SearchContext';
import MangaVerticalList from '~ui/organisms/MangaVerticalList';
import SearchBar from '~ui/organisms/SearchBar';

const styles = StyleSheet.create({
	container: {
		paddingTop: 15,
		paddingHorizontal: 15,
	},
});

function SearchScreen() {
	const [results, setResults] = useState<Array<IMangaShort>>([]);

	return (
		<SearchContext.Provider value={{ results, setResults }}>
			<SearchBar style={styles.container} />
			<MangaVerticalList data={results} />
		</SearchContext.Provider>
	);
}

export default SearchScreen;
