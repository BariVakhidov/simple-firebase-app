/* eslint-disable @typescript-eslint/no-var-requires */
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { PUBLIC } = require("../utils/constants");

const options = { patterns: [{ from: `${PUBLIC}/locales`, to: "static/locales" }] };

const getCopyWebpackPlugin = () => {
	return new CopyWebpackPlugin(options);
};

module.exports = {
	getCopyWebpackPlugin,
};
