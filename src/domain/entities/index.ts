export interface IChapter {
	id: string;
	date: string;
	index: number;
	name: string;
}

export interface IManga {
	id: string;
	slug: string;
	name: string;
	cover: string;
	banner: string;
}

export interface IPage {
	id: string;
	index: string;
	url: string;
}

export type IChapters = Array<IChapter>;
export type IMangas = Array<IManga>;
export type IPages = Array<IPage>;
