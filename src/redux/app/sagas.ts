import { onAuthStateChanged, User } from "firebase/auth";
import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import { EventChannel, eventChannel } from "redux-saga";
import { all, call, fork, put, race, select, take, takeLatest } from "@redux-saga/core/effects";

import type { Nullable } from "@/baseTypes";
import { appAuth, db } from "@/firebaseApp";
import { firebaseAuth } from "@/firebaseApp/firebaseAuth";
import { firebaseModels } from "@/firebaseApp/firebaseModels";
import { firebaseUser } from "@/firebaseApp/firebaseUser";
import { appActionCreators } from "@/redux/app/action-creators";
import { AppActionTypes } from "@/redux/app/action-types";
import { appSelectors } from "@/redux/app/selectors";
import type { UserInfo } from "@/redux/app/types";
import { modelsActionCreators } from "@/redux/models/action-creators";
import type { FavoriteModel } from "@/redux/models/types";
import { tryCatchSaga, TryCatchSagaOptions } from "@/redux/sagas";
import type { AppState } from "@/redux/store";
import { getUserInfo } from "@/utils/getUserInfo";

const tryCatchSagaOptions: TryCatchSagaOptions<keyof AppState> = {
	withProgress: true,
	updateProgressAction: appActionCreators.setFetching,
	withDelay: true,
};

function createUserChanel() {
	return eventChannel((emitter) => {
		const unsubscribe = onAuthStateChanged(appAuth, (user) => (user ? emitter(user) : emitter("")));
		return () => {
			unsubscribe();
			console.log("onAuthStateChanged unsubscribed");
		};
	});
}

function createModelsChanel(userId: string) {
	return eventChannel((emitter) => {
		const unsubscribe = onSnapshot(doc(db, "users", userId), (document) => {
			emitter(document.data()?.favoritesModels);
		});
		return () => {
			unsubscribe();
			console.log("onSnapshot unsubscribed");
		};
	});
}

function* modelsStateWatcher(userId: string) {
	const modelsChannel: EventChannel<FavoriteModel> = yield call(createModelsChanel, userId);
	try {
		while (true) {
			const response: FavoriteModel[] = yield take(modelsChannel);
			yield put(modelsActionCreators.setFavoritesModels(response));
		}
	} finally {
		console.log("MODELS CHANNEL CLOSED");
		modelsChannel.close();
	}
}

function* userStateWatcher() {
	const userChannel: EventChannel<User> = yield call(createUserChanel);
	try {
		let initialized = false;
		while (true) {
			const user: User | "" = yield take(userChannel);
			let userInfo: Nullable<UserInfo> = null;
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
		console.log("USER CHANNEL CLOSED");
		userChannel.close();
	}
}

function* initializeUserModels(action: ReturnType<typeof appActionCreators.initializeUserModels>) {
	const userId = action.payload;
	const models: DocumentData = yield call(firebaseModels.getModels, userId);
	if (!models) {
		yield call(firebaseModels.createUserEntity, userId);
	}
	yield fork(modelsStateWatcher, userId);
}

export function* initialize() {
	yield fork(userStateWatcher);
}

function* updateUser(action: ReturnType<typeof appActionCreators.updateUser>) {
	const { email, ...updatedParams } = action.payload;
	const currentUser: UserInfo = yield select(appSelectors.getUser);
	if (email && email !== currentUser.email) {
		yield call(firebaseUser.updateUserEmail, email);
	}
	yield call(firebaseUser.updateUserProfile, updatedParams);
	const user: User = yield call(firebaseUser.getCurrentUser);
	yield put(appActionCreators.setUser(getUserInfo(user)));
}

function* logout() {
	yield call(firebaseAuth.signOut);
}

function* signInWithGoogle() {
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
			yield race([take(AppActionTypes.CANCEL_SUBSCRIPTION), call(tryCatchSaga(initialize), action)]);
		}),
		takeLatest(
			AppActionTypes.INIT_USER_MODELS,
			function* (action: ReturnType<typeof appActionCreators.initializeUserModels>) {
				yield race([take(AppActionTypes.LOGOUT), call(tryCatchSaga(initializeUserModels), action)]);
			}
		),
		takeLatest(AppActionTypes.SIGN_IN_WITH_GOOGLE, tryCatchSaga(signInWithGoogle, tryCatchSagaOptions)),
		takeLatest(AppActionTypes.UPDATE_USER, tryCatchSaga(updateUser, tryCatchSagaOptions)),
	]);
}
