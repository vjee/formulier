module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2019,
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'prettier',
	],
	rules: {
		'react/react-in-jsx-scope': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'sort-imports': ['error'],
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
}
