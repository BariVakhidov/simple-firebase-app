const getCssLoader = () => {
	return {
		loader: require.resolve("css-loader"),
		options: {
			esModule: true,
			importLoaders: 1,
			modules: true,
		},
	};
};

module.exports = { getCssLoader };
