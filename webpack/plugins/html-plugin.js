/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { ASSETS_FOLDER } = require("../utils/constants");

const options = {
	title: "3D world",
	template: path.join(ASSETS_FOLDER, "template/index.html"),
	favicon: path.join(ASSETS_FOLDER, "template/icon.png"),
};

const getHtmlWebpackPlugin = () => {
	return new HtmlWebpackPlugin(options);
};

module.exports = {
	getHtmlWebpackPlugin,
};
