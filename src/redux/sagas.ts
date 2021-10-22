import { call, delay, fork, put } from '@redux-saga/core/effects';
import { appSaga } from '@/redux/app/sagas';
import { AppState } from '@/redux/store';
import { AnyAction } from 'redux';
import { appActionCreators } from '@/redux/app/action-creators';
import { modelsSaga } from '@/redux/models/sagas';

export function* rootSaga() {
  yield fork(appSaga);
  yield fork(modelsSaga);
}

/**
 *
 * @param saga
 * @param options
 */
export function tryCatchSaga<A, K extends keyof AppState>(
  saga: (a: A, s?: AppState[K]) => void,
  options?: TryCatchSagaOptions<K>,
) {
  return function* (a: A) {
    try {
      if (options?.withProgress) {
        yield put(options.updateProgressAction(true));
      }
      if (options?.withDelay) {
        yield delay(500);
      }
      yield call(saga, a);
    } catch (error) {
      console.log(error);
      yield put(appActionCreators.setError(error.code));
    } finally {
      if (options?.withProgress) {
        yield put(options.updateProgressAction(false));
      }
    }
  };
}

export interface TryCatchSagaOptions<K> {
  withProgress: boolean;
  withStore?: K;
  updateProgressAction: (payload: boolean) => AnyAction;
  withDelay?: boolean;
}