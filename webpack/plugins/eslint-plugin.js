/* eslint-disable @typescript-eslint/no-var-requires */
const ESLintPlugin = require("eslint-webpack-plugin");

const options = {
	extensions: ["ts", "tsx"],
	exclude: ["/node_modules/", "/.idea/", "/.vscode/", "/webpack/"],
};

const getEslintWebpackPlugin = () => {
	return new ESLintPlugin(options);
};

module.exports = {
	getEslintWebpackPlugin,
};
