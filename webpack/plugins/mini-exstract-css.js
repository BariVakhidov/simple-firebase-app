// Modules
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// Constants
const { IS_DEVELOPMENT } = require("../utils/constants");

const name = IS_DEVELOPMENT
	? "assets/css/styles.css"
	: "css/styles-[contenthash:8].css";

const getMiniCssExtractPlugin = () => {
	return new MiniCssExtractPlugin({
		filename: name,
		chunkFilename: name,
	});
};

module.exports = { getMiniCssExtractPlugin };