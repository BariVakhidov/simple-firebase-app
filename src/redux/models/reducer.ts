import { createReducer, Reducer } from "@reduxjs/toolkit";

import { modelsActionCreators } from "@/redux/models/action-creators";
import { ModelsTypes } from "@/redux/models/types";

const initialState: Readonly<ModelsTypes.ModelsState> = {
	modelsSearch: null,
	searchParams: {},
	categories: null,
	userFavoritesModels: [],
	isFetching: false,
	error: null,
};

export const modelsReducer: Reducer<ModelsTypes.ModelsState> = createReducer(initialState, (builder) => {
	builder
		.addCase(modelsActionCreators.setFetching, (state, action) => {
			state.isFetching = action.payload;
		})
		.addCase(modelsActionCreators.setSearchParams, (state, action) => {
			state.searchParams = action.payload;
		})
		.addCase(modelsActionCreators.setFavoritesModels, (state, action) => {
			state.userFavoritesModels = action.payload;
		})
		.addCase(modelsActionCreators.setCategories, (state, action) => {
			state.categories = action.payload;
		})
		.addCase(modelsActionCreators.resetSearchParams, (state) => {
			const q = state.searchParams?.q ? state.searchParams.q : "";
			state.searchParams = { q };
		})
		.addCase(modelsActionCreators.cleanup, (state) => {
			state.modelsSearch = null;
			state.searchParams = {};
			state.categories = null;
		})
		.addCase(modelsActionCreators.setModels, (state, action) => {
			state.modelsSearch = action.payload;
		})
		.addCase(modelsActionCreators.setMoreModels, (state, action) => {
			const models = state.modelsSearch?.results;
			if (models) {
				models.push(...action.payload.results);
				state.modelsSearch = { ...action.payload, results: models };
			}
		});
});
