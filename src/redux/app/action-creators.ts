import { createAction } from "@reduxjs/toolkit";

import type { Nullable } from "@/baseTypes";
import { AppActionTypes } from "@/redux/app/action-types";
import type { EditableInfo, UserAuthParams, UserInfo } from "@/redux/app/types";

export const appActionCreators = {
	login: createAction<UserAuthParams>(AppActionTypes.LOGIN),
	signInWithGoogle: createAction(AppActionTypes.SIGN_IN_WITH_GOOGLE),
	initialize: createAction(AppActionTypes.INIT),
	initializeUserModels: createAction<string>(AppActionTypes.INIT_USER_MODELS),
	setInitialize: createAction<boolean>(AppActionTypes.SET_INIT),
	logout: createAction(AppActionTypes.LOGOUT),
	setFetching: createAction<boolean>(AppActionTypes.SET_FETCHING),
	signUp: createAction<UserAuthParams>(AppActionTypes.SIGN_UP),
	setUser: createAction<Nullable<UserInfo>>(AppActionTypes.SET_USER),
	updateUser: createAction<EditableInfo>(AppActionTypes.UPDATE_USER),
	setError: createAction<string>(AppActionTypes.SET_ERROR),
	cancelSubscription: createAction(AppActionTypes.CANCEL_SUBSCRIPTION),
};
