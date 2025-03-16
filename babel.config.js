module.exports = {
	presets: ['module:@react-native/babel-preset'],
	plugins: [
		[
			'module-resolver',
			{
				alias: {
					'~domain': './src/domain',
					'~infrastructure': './src/infrastructure',
					'~ui': './src/ui',
				},
			},
		],
		'react-native-reanimated/plugin',
	],
};
