import axios from 'axios';

import type {
	IManga,
	IMangaDexManga,
	IMangaDexResponse,
	IMangaShort,
} from '~domain/entities';
import type { IMangaDexList } from '~domain/entities/list';
import { BASE_URL, getCover } from '~infrastructure/fetch';

const convertToManga = (data: IMangaDexManga): IManga => {
	let originalTitle = '';
	const titleObject = data?.attributes.altTitles.find((t) => {
		if (Object.keys(t)[0] === 'ja') {
			return Object.values(t)[0];
		}
	});
	if (titleObject) {
		originalTitle = Object.values(titleObject)[0];
	}

	return {
		id: data.id,
		title: data.attributes.title.en,
		originalTitle,
		status: data.attributes.status,
		year: data.attributes.year,
		description: data.attributes.description.en,
		author: data.relationships.find((r) => r.type === 'author')?.attributes
			?.name,
		genres: data.attributes.tags
			.filter((t) => t.attributes.group === 'genre')
			.map((t) => t.attributes.name.en),
		cover: getCover(data),
	};
};

const convertToMangaShort = (data: IMangaDexManga): IMangaShort => {
	return {
		id: data.id,
		title: data.attributes.title.en,
		status: data.attributes.status,
		year: data.attributes.year,
		cover: getCover(data, true),
	};
};

export const getMangaByIds = async (
	ids: Array<string>,
): Promise<Array<IMangaShort>> => {
	return axios
		.get<IMangaDexResponse<Array<IMangaDexManga>>>(`${BASE_URL}/manga`, {
			params: {
				'order[createdAt]': 'desc',
				'order[followedCount]': 'desc',
				hasAvailableChapters: true,
				'ids[]': ids,
				'includes[]': 'cover_art',
			},
		})
		.then(({ data: { data } }) => data.map(convertToMangaShort));
};

export const getMangaFromList = async (
	id: string,
): Promise<Array<IMangaShort>> => {
	return axios
		.get<IMangaDexResponse<IMangaDexList>>(`${BASE_URL}/list/${id}`)
		.then(({ data: { data } }) => {
			return getMangaByIds(data.relationships.map((d) => d.id));
		});
};

export const getMostPopularManga = async (): Promise<Array<IMangaShort>> => {
	return axios
		.get<IMangaDexResponse<Array<IMangaDexManga>>>(`${BASE_URL}/manga`, {
			params: {
				'order[followedCount]': 'desc',
				'includes[]': 'cover_art',
			},
		})
		.then(({ data: { data } }) => data.map(convertToMangaShort));
};

export const getRecentlyAddedManga = async (): Promise<Array<IMangaShort>> => {
	return axios
		.get<IMangaDexResponse<Array<IMangaDexManga>>>(`${BASE_URL}/manga`, {
			params: {
				hasAvailableChapters: true,
				'order[createdAt]': 'desc',
				'includes[]': 'cover_art',
			},
		})
		.then(({ data: { data } }) => data.map(convertToMangaShort));
};

export const searchManga = async (
	title: string,
): Promise<Array<IMangaShort>> => {
	return axios
		.get<IMangaDexResponse<Array<IMangaDexManga>>>(`${BASE_URL}/manga`, {
			params: {
				title,
				'order[rating]': 'desc',
				'order[followedCount]': 'desc',
				'includes[]': 'cover_art',
			},
		})
		.then(({ data: { data } }) => data.map(convertToMangaShort));
};

export const getManga = async (id: string): Promise<IManga> => {
	return axios
		.get<IMangaDexResponse<IMangaDexManga>>(`${BASE_URL}/manga/${id}`, {
			params: {
				'includes[]': ['cover_art', 'author'],
			},
		})
		.then(({ data: { data } }) => convertToManga(data));
};
