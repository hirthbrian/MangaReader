export interface IMangeDexChapter {
	id: string;
	type: string;
	attributes: {
		volume: string;
		chapter: string;
		title: string;
		translatedLanguage: string;
		externalUrl?: string;
		publishAt: string;
		readableAt: string;
		createdAt: string;
		updatedAt: string;
		pages: number;
		version: number;
	};
	relationships: Array<{
		id: string;
		type: string;
		attributes: {
			name?: string;
		};
	}>;
}

export interface IMangeDexChapterImages {
	baseUrl: string;
	chapter: {
		hash: string;
		data: Array<string>;
		dataSaver: Array<string>;
	};
}

export interface IChapter {
	id: string;
	date: string;
	chapter: string;
	title: string;
	volume: string;
	pages: number;
	translatedLanguage: string;
	externalUrl?: string;
	scanlationGroup?: {
		name?: string;
	};
}
