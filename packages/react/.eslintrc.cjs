module.exports = {
	root: true,
	extends: ['@formulier/eslint-config'],
	parserOptions: {
		project: './tsconfig.lint.json',
		tsConfigRootDir: __dirname,
	},
}
