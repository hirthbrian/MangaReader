module.exports = {
	root: true,
	extends: '@react-native',
	plugins: ['simple-import-sort'],
	rules: {
		'no-console': 'warn',
		'react-native/no-unused-styles': 'warn',
		'react/jsx-curly-brace-presence': 'warn',
		'simple-import-sort/exports': 'error',
		'simple-import-sort/imports': 'error',
	},
};
