import { all, call, put, race, select, take, takeLatest } from '@redux-saga/core/effects';
import { AppActionTypes } from '@/redux/app/action-types';
import { tryCatchSaga, TryCatchSagaOptions } from '@/redux/sagas';
import { onAuthStateChanged } from 'firebase/auth';
import { appActionCreators } from '@/redux/app/action-creators';
import { firebaseAuth } from '@/firebase/firebaseAuth';
import { EventChannel, eventChannel } from 'redux-saga';

import { Nullable } from '@/baseTypes';
import { appAuth } from '@/firebase';
import { AppState } from '@/redux/store';
import { AppTypes } from '@/redux/app/types';
import { firebaseUser } from '@/firebase/firebaseUser';
import firebase from 'firebase/compat';
import User = firebase.User;
import { getUserInfo } from '@/utils/getUserInfo';

const tryCatchSagaOptions: TryCatchSagaOptions<keyof AppState> = {
  withProgress: true,
  updateProgressAction: appActionCreators.setFetching,
  withDelay: true,
};

function createUserChanel() {
  const subscribe = emitter => {
    const unsubscribe = onAuthStateChanged(appAuth, user => user ? emitter(user) : emitter(''));
    return () => {
      unsubscribe();
      console.log('onAuthStateChanged unsubscribed');
    };
  };
  return eventChannel(subscribe);
}

export function* initialize(action: ReturnType<typeof appActionCreators.initialize>) {
  const userChanel: EventChannel<User> = yield call(createUserChanel);
  try {
    let initialized = false;
    while (true) {
      const user: User | '' = yield take(userChanel);
      let userInfo: Nullable<AppTypes.UserInfo> = null;
      if (user) {
        userInfo = getUserInfo(user);
      }
      yield put(appActionCreators.setUser(userInfo));
      if (!initialized) {
        initialized = true;
        yield put(appActionCreators.setInitialize(true));
      }
    }
  } finally {
    userChanel.close();
  }
}

function* updateUser(action: ReturnType<typeof appActionCreators.updateUser>) {
  const { email, ...updatedParams } = action.payload;
  const currentUser: AppTypes.UserInfo = yield select((state: AppState) => state.app.user);
  if (email !== currentUser.email) {
    yield call(firebaseUser.updateUserEmail, email);
  }
  yield call(firebaseUser.updateUserProfile, updatedParams);
  const user = yield call(firebaseUser.getCurrentUser);
  yield put(appActionCreators.setUser(getUserInfo(user)));
}

function* logout(action: ReturnType<typeof appActionCreators.logout>) {
  yield call(firebaseAuth.signOut);
}

function* signInWithGoogle(action: ReturnType<typeof appActionCreators.signInWithGoogle>) {
  yield call(firebaseAuth.signInWithGoogle);
}

function* login(action: ReturnType<typeof appActionCreators.login>) {
  yield call(firebaseAuth.signInWithCredentials, action.payload);
}

function* signUp(action: ReturnType<typeof appActionCreators.signUp>) {
  yield call(firebaseAuth.createUser, action.payload);
}

export function* appSaga() {
  yield all([
    takeLatest(AppActionTypes.LOGIN, tryCatchSaga(login, tryCatchSagaOptions)),
    takeLatest(AppActionTypes.SIGN_UP, tryCatchSaga(signUp, tryCatchSagaOptions)),
    takeLatest(AppActionTypes.LOGOUT, tryCatchSaga(logout, tryCatchSagaOptions)),
    takeLatest(AppActionTypes.INIT, function* (action: ReturnType<typeof appActionCreators.initialize>) {
      yield race([
        take(AppActionTypes.CANCEL_SUBSCRIPTION),
        call(tryCatchSaga(initialize), action),
      ]);
    }),
    takeLatest(AppActionTypes.SIGN_IN_WITH_GOOGLE, tryCatchSaga(signInWithGoogle, tryCatchSagaOptions)),
    takeLatest(AppActionTypes.UPDATE_USER, tryCatchSaga(updateUser, tryCatchSagaOptions)),
  ]);
}

