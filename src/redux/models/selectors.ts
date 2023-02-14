import { createSelector } from "reselect";

import { AppState } from "@/redux/store";

const getModelsSearch = (state: AppState) => state.models.modelsSearch;
const getSearchParams = (state: AppState) => state.models.searchParams;
const getCursors = createSelector(getSearchParams, (searchParams) => searchParams?.cursor);
const getUserFavoritesModels = (state: AppState) => state.models.userFavoritesModels;
const getIsFetching = (state: AppState) => state.models.isFetching;
const getCategories = (state: AppState) => state.models.categories;

export const modelsSelectors = {
	getModelsSearch,
	getSearchParams,
	getIsFetching,
	getUserFavoritesModels,
	getCategories,
	getCursors,
};
