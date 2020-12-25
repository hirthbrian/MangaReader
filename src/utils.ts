import Colors from './colors';

export const sectionBySaga = (chapters) => [{
  title: 'East Blue',
  data: chapters.slice(0, 101),
}, {
  title: 'Alabasta',
  data: chapters.slice(102, 218),
}, {
  title: 'Sky Island',
  data: chapters.slice(219, 303),
}, {
  title: 'Water 7',
  data: chapters.slice(304, 442),
}, {
  title: 'Thriller Bark',
  data: chapters.slice(443, 490),
}, {
  title: 'Summit War',
  data: chapters.slice(491, 598),
}, {
  title: 'Fish-Man Island',
  data: chapters.slice(599, 654),
}, {
  title: 'Dressrosa',
  data: chapters.slice(655, 802),
}, {
  title: 'Four Emperors',
  data: chapters.slice(803, chapters.lenght),
}];

export const getContrastYIQ = (hexcolor: string) => {
  hexcolor = hexcolor.replace('#', '');
  var r = parseInt(hexcolor.substr(0, 2), 16);
  var g = parseInt(hexcolor.substr(2, 2), 16);
  var b = parseInt(hexcolor.substr(4, 2), 16);
  var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? Colors.black : Colors.white;
}

export const pad = (string: string, size: number) => {
  while (string.length < (size || 2)) { string = "0" + string; }
  return string;
}
