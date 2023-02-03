/* eslint-disable @typescript-eslint/no-var-requires */
const StyleLintPlugin = require("stylelint-webpack-plugin");

const options = {
	files: ["**/*.{css,sss,less,scss,sass}"],
};

const getStylelintWebpackPlugin = () => {
	return new StyleLintPlugin(options);
};

module.exports = {
	getStylelintWebpackPlugin,
};
