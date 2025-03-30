import type { IMangaDexManga } from '~domain/entities';

export const BASE_URL = 'https://api.mangadex.org';

export const getCover = (data: IMangaDexManga, thumbnail = false) => {
	const fileName = data.relationships.find((r) => r.type === 'cover_art')
		?.attributes?.fileName;

	if (!fileName) {
		return 'https://picsum.photos/120/168';
	}
	return `https://uploads.mangadex.org/covers/${data.id}/${fileName}${
		thumbnail ? '.256.jpg' : ''
	}`;
};

export * from './chapter';
export * from './manga';
