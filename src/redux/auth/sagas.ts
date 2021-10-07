import { all, takeLatest } from '@redux-saga/core/effects';
import { AuthActionTypes } from '@/redux/auth/action-types';
import { tryCatchSaga } from '@/redux/sagas';

function* login() {

}

export function* authSaga() {
  yield all([
    takeLatest(AuthActionTypes.LOGIN, tryCatchSaga(login)),
  ]);
}