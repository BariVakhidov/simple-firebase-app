import { createAction } from '@reduxjs/toolkit';
import { AppActionTypes } from '@/redux/app/action-types';
import { InferActionsType } from '@/redux/store';
import { ModelsActionTypes } from '@/redux/models/action-types';
import { SketchfabClientTypes } from '@/client/SketchfabClient/sketchfabClient-types';
import { Nullable } from '@/baseTypes';
import { ModelsTypes } from '@/redux/models/types';
import { SetFirebaseModelRequest } from '@/firebase/types';

export const modelsActionCreators = {
  setModels: createAction<SketchfabClientTypes.SearchModelsResponse>(ModelsActionTypes.SET_MODELS),
  setMoreModels: createAction<SketchfabClientTypes.SearchModelsResponse>(ModelsActionTypes.SET_MORE_MODELS),
  getModels: createAction<Partial<SketchfabClientTypes.SearchModelsParams>>(ModelsActionTypes.GET_MODELS),
  loadMoreModels: createAction(ModelsActionTypes.GET_MORE_MODELS),
  setFetching: createAction<boolean>(ModelsActionTypes.SET_FETCHING),
  setError: createAction<string>(AppActionTypes.SET_ERROR),
  setCategories: createAction<SketchfabClientTypes.Category[]>(ModelsActionTypes.SET_CATEGORIES),
  setSearchParams: createAction<Nullable<Partial<SketchfabClientTypes.SearchModelsParams>>>(ModelsActionTypes.SET_SEARCH_PARAMS),
  resetSearchParams: createAction(ModelsActionTypes.RESET_SEARCH_PARAMS),
  getCategories: createAction(ModelsActionTypes.GET_CATEGORIES),
  changeModelCondition: createAction<SetFirebaseModelRequest>(ModelsActionTypes.CHANGE_MODEL_CONDITION),
  setFavoritesModels: createAction<ModelsTypes.FavoriteModel[]>(ModelsActionTypes.SET_FAVORITES_MODELS),
  cleanup: createAction(ModelsActionTypes.CLEANUP),
};

export type ModelsActions = InferActionsType<typeof modelsActionCreators>;