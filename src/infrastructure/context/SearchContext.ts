import {
	createContext,
	type Dispatch,
	type SetStateAction,
	useContext,
} from 'react';

import type { IMangaShort } from '~domain/entities';

type ContextType = {
	results: Array<IMangaShort>;
	setResults: Dispatch<SetStateAction<Array<IMangaShort>>>;
};

export const SearchContext = createContext<ContextType | null>(null);

export const useSearchContext = () => {
	const context = useContext(SearchContext);
	if (context === null) {
		throw new Error(
			'useSearchContext must be used within a SearchContext.Provider',
		);
	}
	return context;
};
