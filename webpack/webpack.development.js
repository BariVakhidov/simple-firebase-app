/* eslint-disable @typescript-eslint/no-var-requires */
const { getEslintWebpackPlugin } = require("./plugins/eslint-plugin");
const { getStylelintWebpackPlugin } = require("./plugins/stylelint-plugin");

module.exports = () => ({
	devtool: "eval",
	devServer: {
		historyApiFallback: true,
		open: true,
		hot: true,
		client: {
			logging: "info",
		},
	},
	plugins: [getEslintWebpackPlugin(), getStylelintWebpackPlugin()],
});
