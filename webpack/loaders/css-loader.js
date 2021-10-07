const getCssLoader = () => {
	return {
		loader: "css-loader",
		options: {
			sourceMap: true,
			esModule: true,
			importLoaders: 1,
			modules: true,
		},
	};
};

module.exports = { getCssLoader };