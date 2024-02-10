module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2019,
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended-type-checked',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'prettier',
	],
	rules: {
		'react/react-in-jsx-scope': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-unsafe-assignment': 'off',
		'@typescript-eslint/no-unsafe-return': 'off',
		'@typescript-eslint/no-unsafe-member-access': 'off',
		'@typescript-eslint/no-unsafe-argument': 'off',
		'@typescript-eslint/consistent-type-imports': 'error',
		'@typescript-eslint/consistent-type-exports': 'error',
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
}
