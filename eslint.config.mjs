import {defineConfig} from 'eslint/config'
import globals from 'globals'
import jsPlugin from '@eslint/js'
import tsPlugin from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
import prettierPlugin from 'eslint-plugin-prettier/recommended'

export default defineConfig([
	{
		name: 'global ignores',
		ignores: ['**/coverage/**/*', '**/dist/**/*', 'docs/.vitepress/**/*'],
	},

	{
		name: 'js recommended',
		...jsPlugin.configs.recommended,
	},

	{
		name: 'react recommended',
		...reactPlugin.configs.flat.recommended,
	},

	{
		name: 'react jsx runtime',
		...reactPlugin.configs.flat['jsx-runtime'],
	},

	...tsPlugin.configs.recommendedTypeChecked,

	prettierPlugin,

	{
		name: 'global configuration',

		languageOptions: {
			...reactPlugin.configs.flat.recommended.languageOptions,

			parserOptions: {
				projectService: {
					allowDefaultProject: ['eslint.config.mjs'],
				},
				tsconfigRootDir: import.meta.dirname,
			},

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
			'no-unused-vars': 'off',

			'react/prop-types': 'off',
			'react/display-name': 'off',

			'@typescript-eslint/consistent-type-imports': 'error',
			'@typescript-eslint/consistent-type-exports': 'error',
			'@typescript-eslint/no-unsafe-assignment': 'off',
			'@typescript-eslint/no-unsafe-member-access': 'off',
			'@typescript-eslint/no-unsafe-return': 'off',
			'@typescript-eslint/no-unsafe-argument': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
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
])
