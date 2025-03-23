import {defineConfig} from 'eslint/config'
import globals from 'globals'
import jsPlugin from '@eslint/js'
import tsPlugin from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
import prettierPlugin from 'eslint-plugin-prettier/recommended'

export default defineConfig([
	{
		name: 'global ignores',
		ignores: ['**/coverage/**/*', '**/dist/**/*', 'docs/.vitepress/dist/**/*', 'docs/.vitepress/cache/**/*'],
	},

	{
		name: 'js recommended',
		...jsPlugin.configs.recommended,
	},

	...tsPlugin.configs.recommendedTypeChecked,

	{
		name: 'react recommended',
		...reactPlugin.configs.flat.recommended,
	},

	{
		name: 'react jsx runtime',
		...reactPlugin.configs.flat['jsx-runtime'],
	},

	prettierPlugin,

	{
		name: 'ts configuration',
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			'no-unused-vars': 'off',

			'@typescript-eslint/consistent-type-imports': 'error',
			'@typescript-eslint/consistent-type-exports': 'error',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					ignoreRestSiblings: true,
					argsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
				},
			],
		},
	},

	{
		name: 'global configuration',

		languageOptions: {
			...reactPlugin.configs.flat.recommended.languageOptions,

			globals: {
				...globals.serviceworker,
				...globals.browser,
			},
		},

		settings: {
			react: {
				version: 'detect',
			},
		},

		rules: {
			'no-console': 'error',
			'no-debugger': 'error',

			'react/prop-types': 'off',
			'react/display-name': 'off',
		},
	},
])
