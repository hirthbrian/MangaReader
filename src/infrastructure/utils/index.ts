import { IChapters } from '../../domain/entities';
import ColorsEnum from '../../domain/enum/ColorsEnum';

export const sectionBySaga = (chapters: IChapters) => [
	{
		title: 'East Blue',
		data: chapters.slice(0, 101).toReversed(),
	},
	{
		title: 'Alabasta',
		data: chapters.slice(102, 218).toReversed(),
	},
	{
		title: 'Sky Island',
		data: chapters.slice(219, 303).toReversed(),
	},
	{
		title: 'Water 7',
		data: chapters.slice(304, 442).toReversed(),
	},
	{
		title: 'Thriller Bark',
		data: chapters.slice(443, 490).toReversed(),
	},
	{
		title: 'Summit War',
		data: chapters.slice(491, 598).toReversed(),
	},
	{
		title: 'Fish-Man Island',
		data: chapters.slice(599, 654).toReversed(),
	},
	{
		title: 'Dressrosa',
		data: chapters.slice(655, 801).toReversed(),
	},
	{
		title: 'Whole Cake',
		data: chapters.slice(802, 908).toReversed(),
	},
	{
		title: 'Wano Country',
		data: chapters.slice(909, 1057).toReversed(),
	},
	{
		title: 'Egghead',
		data: chapters.slice(1058, chapters.length).toReversed(),
	},
];

// export const getContrastYIQ = (hexcolor: string) => {
// 	hexcolor = hexcolor.replace('#', '');
// 	var r = parseInt(hexcolor.substr(0, 2), 16);
// 	var g = parseInt(hexcolor.substr(2, 2), 16);
// 	var b = parseInt(hexcolor.substr(4, 2), 16);
// 	var yiq = (r * 299 + g * 587 + b * 114) / 1000;
// 	return yiq >= 128 ? ColorsEnum.BLACK : ColorsEnum.WHITE;
// };

export const pad = (string: string, size: number) => {
	while (string.length < (size || 2)) {
		string = '0' + string;
	}
	return string;
};
