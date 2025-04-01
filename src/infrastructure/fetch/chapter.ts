import axios from 'axios';
import dayjs from 'dayjs';

import type {
	IChapter,
	IMangaDexResponse,
	IMangeDexChapter,
	IMangeDexChapterImages,
	IPaginated,
} from '~domain/entities';
import { BASE_URL } from '~infrastructure/fetch';

export const getChapters = async (
	id: string,
	offset: number = 0,
): Promise<IPaginated<Array<IChapter>>> => {
	return axios
		.get<IMangaDexResponse<Array<IMangeDexChapter>>>(
			`${BASE_URL}/manga/${id}/feed`,
			{
				params: {
					offset,
					limit: 50,
					// translatedLanguage: ['en'],
					'order[chapter]': 'desc',
					'includes[]': 'scanlation_group',
				},
			},
		)
		.then(({ data }) => {
			const chapters = data.data.map((d) => {
				let chapter: IChapter = {
					id: d.id,
					date: dayjs(d.attributes.updatedAt).fromNow(),
					chapter: d.attributes.chapter,
					title: d.attributes.title,
					externalUrl: d.attributes.externalUrl,
					pages: d.attributes.pages,
					volume: d.attributes.volume,
					translatedLanguage: d.attributes.translatedLanguage,
				};

				const scanlationGroup = d.relationships.find(
					(r) => r.type === 'scanlation_group',
				);
				if (scanlationGroup) {
					chapter = {
						...chapter,
						scanlationGroup: {
							name: scanlationGroup.attributes.name,
						},
					};
				}

				return chapter;
			});
			return {
				data: chapters,
				offset: (data.offset || 0) + chapters.length,
				total: data.total,
			};
		});
};

export const getImages = async (id: string): Promise<Array<string>> => {
	return axios
		.get<IMangeDexChapterImages>(
			`https://api.mangadex.org/at-home/server/${id}`,
		)
		.then(({ data }) =>
			data.chapter.dataSaver?.map(
				(d) => `${data.baseUrl}/data-saver/${data.chapter.hash}/${d}`,
			),
		);
};
