import { parse } from 'node-html-parser';
import RNFS from 'react-native-fs';
import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const CHAPTER_URL = 'https://www.scan-vf.net/one_piece/chapitre-';
// const CHAPTER_LIST_URL = 'https://www.scan-vf.net/one_piece';

import { IChapters, IMangas, IPages } from '../../domain/entities';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../../../secret';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// await supabase.from('pages').insert(
// 	imagesUrl.map((i, index) => ({
// 		url: i,
// 		index: index + 1,
// 		chapter: chapterIndex,
// 	})),
// );

export const getImages = async (chapterId: string): Promise<IPages> => {
	return supabase
		.from('pages')
		.select(`url, index, chapters (name)`)
		.eq('chapter_id', chapterId)
		.then(({ data }) => data);
	// return fetch(`${CHAPTER_URL}${chapterId}`)
	// 	.then((j) => j.text())
	// 	.then(async (data) => {
	// 		if (data) {
	// 			const imagesUrl = parse(data)
	// 				.querySelectorAll('#all img')
	// 				.map((img) => img.getAttribute('data-src')?.trim());
	// 			// await RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/${chapterId}`);
	// 			// const promises = imagesUrl.map((url, index) =>
	// 			// 	RNFS.downloadFile({
	// 			// 		fromUrl: url,
	// 			// 		toFile: `${RNFS.DocumentDirectoryPath}/${chapterId}/${index}.jpg`,
	// 			// 	}).promise.then(
	// 			// 		() => `${RNFS.DocumentDirectoryPath}/${chapterId}/${index}.jpg`,
	// 			// 	),
	// 			// );
	// 			return [];
	// 			// return Promise.all(promises);
	// 		}
	// 		return [];
	// 	})
	// 	.catch((e) => console.log(e.message));
};

export const getChapters = async (mangaId: string): Promise<IChapters> => {
	return supabase
		.from('chapters')
		.select(`id, name, date, index`)
		.eq('manga_id', mangaId)
		.order('index', { ascending: false })
		.then(({ data }) => data);
};

export const getMangas = async (): Promise<IMangas> => {
	return supabase
		.from('mangas')
		.select(`id, name, cover,banner, chapters (index, name, date)`)
		.order('index', { referencedTable: 'chapters', ascending: false })
		.limit(1, { referencedTable: 'chapters' })
		.then(({ data }) =>
			data?.map((d) => ({
				id: d.id,
				name: d.name,
				cover: d.cover,
				banner: d.banner,
				lastChapter: d.chapters[0],
			})),
		);
};
