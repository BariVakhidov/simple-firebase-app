/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const { BUILD_FOLDER, NODE_ENV, PRODUCTION, IS_DEVELOPMENT } = require("./webpack/utils/constants");
const { getHtmlWebpackPlugin } = require("./webpack/plugins/html-plugin");
const { getCssLoader } = require("./webpack/loaders/css-loader");
const { getStyleLoader } = require("./webpack/loaders/style-loader");
const { getMiniCssExtractPlugin } = require("./webpack/plugins/mini-extract-css");
const { merge } = require("webpack-merge");
const Dotenv = require("dotenv-webpack");
const modeConfiguration = (env) => require(`./webpack/webpack.${env}`)(env);

const mode = NODE_ENV || PRODUCTION;

const addons = (/* string | string[] */ addonsArg) => {
	let addons = [...[addonsArg]] // Normalize array of addons (flatten)
		.filter(Boolean); // If addons is undefined, filter it out

	return addons.map((addonName) => require(`./webpack/plugins/${addonName}.js`));
};

module.exports = (env) => {
	return merge(
		{
			mode,
			entry: "./src/index.tsx",
			output: {
				path: path.resolve(__dirname, BUILD_FOLDER),
				filename: "js/[name].[contenthash].js",
				chunkFilename: "js/[name].[contenthash].js",
				assetModuleFilename: "images/[hash][ext][query]",
				publicPath: "/",
				clean: true,
			},
			module: {
				rules: [
					{
						test: /\.tsx?$/,
						exclude: /node_modules/,
						loader: require.resolve("ts-loader"),
					},
					{
						test: /\.css$/i,
						use: [getStyleLoader(), require.resolve("css-loader")],
					},
					{
						test: /\.s[ac]ss$/i,
						use: [getStyleLoader(), getCssLoader(), require.resolve("sass-loader")],
					},
					{
						test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
						type: "asset/resource",
					},
				],
			},
			resolve: {
				extensions: [".ts", ".tsx", ".js"],
				alias: {
					"react-redux": IS_DEVELOPMENT ? "react-redux/dist/react-redux.js" : "react-redux/lib",
					"@Components": path.resolve(__dirname, "src/components/"),
					"@Pages": path.resolve(__dirname, "src/pages/"),
					"@Utils": path.resolve(__dirname, "src/utils/"),
					"@Client": path.resolve(__dirname, "src/client/"),
					"@Assets": path.resolve(__dirname, "./assets/"),
					"@": path.resolve(__dirname, "src/"),
				},
			},
			plugins: [getHtmlWebpackPlugin(), getMiniCssExtractPlugin(), new Dotenv()],
		},
		modeConfiguration(mode),
		...addons(env.addons)
	);
};
