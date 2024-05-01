import axios from 'axios';
import { parse } from 'node-html-parser';

import Colors from './colors';

const chapterURL = 'https://www.scan-vf.net/one_piece/chapitre-';
const chapterListURL = 'https://www.scan-vf.net/one_piece';

export const sectionBySaga = (chapters) => [
	{
		title: 'East Blue',
		data: chapters.slice(0, 101),
	},
	{
		title: 'Alabasta',
		data: chapters.slice(102, 218),
	},
	{
		title: 'Sky Island',
		data: chapters.slice(219, 303),
	},
	{
		title: 'Water 7',
		data: chapters.slice(304, 442),
	},
	{
		title: 'Thriller Bark',
		data: chapters.slice(443, 490),
	},
	{
		title: 'Summit War',
		data: chapters.slice(491, 598),
	},
	{
		title: 'Fish-Man Island',
		data: chapters.slice(599, 654),
	},
	{
		title: 'Dressrosa',
		data: chapters.slice(655, 802),
	},
	{
		title: 'Four Emperors',
		data: chapters.slice(803, chapters.length),
	},
];

export const getContrastYIQ = (hexcolor: string) => {
	hexcolor = hexcolor.replace('#', '');
	var r = parseInt(hexcolor.substr(0, 2), 16);
	var g = parseInt(hexcolor.substr(2, 2), 16);
	var b = parseInt(hexcolor.substr(4, 2), 16);
	var yiq = (r * 299 + g * 587 + b * 114) / 1000;
	return yiq >= 128 ? Colors.black : Colors.white;
};

export const pad = (string: string, size: number) => {
	while (string.length < (size || 2)) {
		string = '0' + string;
	}
	return string;
};

export const getImages = (chapterId: number) =>
	axios(`${chapterURL}${chapterId}`).then(async ({ data, status }) => {
		if (status === 200) {
			const root = parse(data);
			return root
				.querySelectorAll('#all img')
				.map((img, index) => img.getAttribute('data-src'));
		}
	});

export const getChapters = () =>
	axios(chapterListURL).then(async ({ data, status }) => {
		if (status === 200) {
			const root = parse(data);
			return root.querySelectorAll('.chapters li').map((chapter) => ({
				index: chapter.querySelector('a')?.text.split(' ')[2],
				title: chapter.querySelector('em')?.text,
			}));
		}
	});
