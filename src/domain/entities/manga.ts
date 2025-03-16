import { MangaStatusType } from '~domain/types';

export interface IMangaDexManga {
	id: string;
	type: string;
	attributes: {
		title: {
			en: string;
		};
		altTitles: Array<{ [key: string]: string }>;
		description: { [key: string]: string };
		isLocked: boolean;
		links: { [key: string]: string };
		originalLanguage: string;
		lastVolume: string;
		lastChapter: string;
		publicationDemographic: string;
		status: MangaStatusType;
		year: number;
		contentRating: string;
		tags: Array<{
			id: string;
			type: string;
			attributes: {
				name: { en: string };
				description: { [key: string]: string };
				group: string;
				version: number;
			};
			relationships: Array<string>;
		}>;
		state: string;
		chapterNumbersResetOnNewVolume: boolean;
		createdAt: string;
		updatedAt: string;
		version: number;
		availableTranslatedLanguages: Array<string>;
		latestUploadedChapter: string;
	};
	relationships: Array<{
		id: string;
		type: string;
		related?: string;
		attributes?: {
			fileName?: string;
			name?: string;
		};
	}>;
}

export interface IMangaShort {
	id: string;
	title: string;
	cover: string;
	year: number;
	status: MangaStatusType;
}

export interface IManga {
	id: string;
	author?: string;
	cover: string;
	description: string;
	status: MangaStatusType;
	year: number;
	genres: Array<string>;
	originalTitle: string;
	title: string;
}
