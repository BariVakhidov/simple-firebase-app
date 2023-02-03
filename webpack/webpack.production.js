/* eslint-disable @typescript-eslint/no-var-requires */
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = () => ({
	optimization: {
		minimize: true,
		minimizer: ["...", new CssMinimizerPlugin()],
		moduleIds: "deterministic",
		runtimeChunk: "single",
		splitChunks: {
			cacheGroups: {
				vendor: {
					name: "node_vendors",
					test: /[\\/]node_modules[\\/]/,
					chunks: "all",
				},
			},
		},
	},
});
