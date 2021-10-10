import { call, fork, put } from '@redux-saga/core/effects';
import { authSaga } from '@/redux/app/sagas';
import { AppState } from '@/redux/store';
import { AnyAction } from 'redux';
import { appActionCreators } from '@/redux/app/action-creators';

export function* rootSaga() {
  yield fork(authSaga);
}

/**
 *
 * @param saga
 * @param options
 */
export function tryCatchSaga<A, K extends keyof AppState>(
  saga: (a: A, s?: AppState[K]) => void,
  options?: { withProgress: boolean; withStore?: K; updateProgressAction: (payload: boolean) => AnyAction },
) {
  return function* (a: A) {
    try {
      if (options?.withProgress) {
        yield put(options.updateProgressAction(true));
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
