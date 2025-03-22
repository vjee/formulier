import {defineConfig, globalIgnores} from 'eslint/config'
import globals from 'globals'
import jsPlugin from '@eslint/js'
import tsPlugin from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
import prettierPlugin from 'eslint-plugin-prettier/recommended'

export default defineConfig([
	{
		files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
	},

	globalIgnores(['**/coverage/**/*', '**/dist/**/*', 'docs/.vitepress/dist/**/*', 'docs/.vitepress/cache/**/*']),

	jsPlugin.configs.recommended,

	{
		files: ['examples/react/**/*.{ts,tsx}'],
		languageOptions: {
			parserOptions: {
				project: 'examples/react/tsconfig.eslint.json',
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},

	{
		files: ['packages/core/**/*.{ts,tsx}'],
		languageOptions: {
			parserOptions: {
				project: 'packages/core/tsconfig.eslint.json',
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},

	{
		files: ['packages/react/**/*.{ts,tsx}'],
		languageOptions: {
			parserOptions: {
				project: 'packages/react/tsconfig.eslint.json',
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},

	...tsPlugin.configs.recommendedTypeChecked.map(config => ({
		...config,
		files: ['**/*.{ts,tsx}'],
		rules: {
			'no-unused-vars': 'off',

			'@typescript-eslint/consistent-type-imports': 'error',
			'@typescript-eslint/consistent-type-exports': 'error',
			'@typescript-eslint/no-unsafe-assignment': 'off',
			'@typescript-eslint/no-unsafe-return': 'off',
			'@typescript-eslint/no-unsafe-member-access': 'off',
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
	})),

	reactPlugin.configs.flat.recommended,
	reactPlugin.configs.flat['jsx-runtime'],

	prettierPlugin,

	{
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
