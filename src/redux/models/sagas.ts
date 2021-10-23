import { all, call, put, select, takeLatest } from '@redux-saga/core/effects';
import { tryCatchSaga, TryCatchSagaOptions } from '@/redux/sagas';
import { AppState } from '@/redux/store';

import { modelsActionCreators } from '@/redux/models/action-creators';
import { sketchfabClient } from '@/client/SketchfabClient';
import { SketchfabClientTypes } from '@/client/SketchfabClient/sketchfabClient-types';
import { ModelsActionTypes } from '@/redux/models/action-types';
import { firebaseModels } from '@/firebase/firebaseModels';
import { ModelsTypes } from '@/redux/models/types';
import FavoriteModel = ModelsTypes.FavoriteModel;

const tryCatchSagaOptions: TryCatchSagaOptions<keyof AppState> = {
  withProgress: true,
  updateProgressAction: modelsActionCreators.setFetching,
  withDelay: true,
};

function* getCategories(action: ReturnType<typeof modelsActionCreators.getCategories>) {
  const categories: SketchfabClientTypes.CategoriesResponse = yield call(sketchfabClient.getCategories);
  yield put(modelsActionCreators.setCategories(categories.results));
}

function* getModels(action: ReturnType<typeof modelsActionCreators.getModels>) {
  const response: SketchfabClientTypes.SearchModelsResponse = yield call(sketchfabClient.getModels, action.payload);
  response.results.forEach(i => i.thumbnails.images.sort((a, b) => b.width - a.width));
  yield put(modelsActionCreators.setModels(response));
}

function* changeModelCondition(action: ReturnType<typeof modelsActionCreators.changeModelCondition>) {
  const data: FavoriteModel[] = yield select((state: AppState) => state.models.userFavoritesModels);
  if (!data.find(model => model.uid === action.payload.model.uid)) {
    yield call(firebaseModels.setModel, action.payload);
  } else {
    yield call(firebaseModels.removeModel, action.payload);
  }
}

function* loadMore() {
  const cursors: SketchfabClientTypes.Cursors = yield select((state: AppState) => state.models.modelsSearch.cursors);
  if (cursors.next) {
    const params: SketchfabClientTypes.SearchModelsParams = yield select((state: AppState) => state.models.searchParams);
    const response: SketchfabClientTypes.SearchModelsResponse = yield call(() => sketchfabClient.getModels({
      ...params,
      count: 24,
      cursor: cursors.next,
    }));
    response.results.forEach(i => i.thumbnails.images.sort((a, b) => b.width - a.width));
    yield put(modelsActionCreators.setMoreModels(response));
  }
}

export function* modelsSaga() {
  yield all([
    takeLatest(ModelsActionTypes.GET_MODELS, tryCatchSaga(getModels, tryCatchSagaOptions)),
    takeLatest(ModelsActionTypes.GET_MORE_MODELS, tryCatchSaga(loadMore)),
    takeLatest(ModelsActionTypes.GET_CATEGORIES, tryCatchSaga(getCategories, tryCatchSagaOptions)),
    takeLatest(ModelsActionTypes.CHANGE_MODEL_CONDITION, tryCatchSaga(changeModelCondition, tryCatchSagaOptions)),
  ]);
}

