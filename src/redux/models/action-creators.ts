import { createAction } from "@reduxjs/toolkit";

import type { Nullable } from "@/baseTypes";
import type {
	Category,
	SearchModelsParams,
	SearchModelsResponse,
} from "@/client/SketchfabClient/sketchfabClient-types";
import type { SetFirebaseModelRequest } from "@/firebaseApp/types";
import { AppActionTypes } from "@/redux/app/action-types";
import { ModelsActionTypes } from "@/redux/models/action-types";
import type { FavoriteModel } from "@/redux/models/types";

export const modelsActionCreators = {
	setModels: createAction<SearchModelsResponse>(ModelsActionTypes.SET_MODELS),
	setMoreModels: createAction<SearchModelsResponse>(ModelsActionTypes.SET_MORE_MODELS),
	getModels: createAction<Partial<SearchModelsParams>>(ModelsActionTypes.GET_MODELS),
	loadMoreModels: createAction(ModelsActionTypes.GET_MORE_MODELS),
	setFetching: createAction<boolean>(ModelsActionTypes.SET_FETCHING),
	setError: createAction<string>(AppActionTypes.SET_ERROR),
	setCategories: createAction<Category[]>(ModelsActionTypes.SET_CATEGORIES),
	setSearchParams: createAction<Nullable<Partial<SearchModelsParams>>>(ModelsActionTypes.SET_SEARCH_PARAMS),
	resetSearchParams: createAction(ModelsActionTypes.RESET_SEARCH_PARAMS),
	getCategories: createAction(ModelsActionTypes.GET_CATEGORIES),
	changeModelCondition: createAction<SetFirebaseModelRequest>(ModelsActionTypes.CHANGE_MODEL_CONDITION),
	setFavoritesModels: createAction<FavoriteModel[]>(ModelsActionTypes.SET_FAVORITES_MODELS),
	cleanup: createAction(ModelsActionTypes.CLEANUP),
};
