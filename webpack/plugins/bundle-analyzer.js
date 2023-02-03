// eslint-disable-next-line @typescript-eslint/no-var-requires
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
	plugins: [
		new BundleAnalyzerPlugin({
			analyzerMode: "server",
		}),
	],
};
