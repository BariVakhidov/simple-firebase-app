import { createAction } from "@reduxjs/toolkit";

import { Nullable } from "@/baseTypes";
import { AppActionTypes } from "@/redux/app/action-types";
import { AppTypes } from "@/redux/app/types";

export const appActionCreators = {
	login: createAction<AppTypes.UserAuthParams>(AppActionTypes.LOGIN),
	signInWithGoogle: createAction(AppActionTypes.SIGN_IN_WITH_GOOGLE),
	initialize: createAction(AppActionTypes.INIT),
	initializeUserModels: createAction<string>(AppActionTypes.INIT_USER_MODELS),
	setInitialize: createAction<boolean>(AppActionTypes.SET_INIT),
	logout: createAction(AppActionTypes.LOGOUT),
	setFetching: createAction<boolean>(AppActionTypes.SET_FETCHING),
	signUp: createAction<AppTypes.UserAuthParams>(AppActionTypes.SIGN_UP),
	setUser: createAction<Nullable<AppTypes.UserInfo>>(AppActionTypes.SET_USER),
	updateUser: createAction<AppTypes.EditableInfo>(AppActionTypes.UPDATE_USER),
	setError: createAction<string>(AppActionTypes.SET_ERROR),
	cancelSubscription: createAction(AppActionTypes.CANCEL_SUBSCRIPTION),
};
