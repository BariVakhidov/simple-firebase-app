import { createAction } from '@reduxjs/toolkit';
import { AppActionTypes } from '@/redux/app/action-types';
import { InferActionsType } from '@/redux/store';
import { AppTypes } from '@/redux/app/types';
import { Nullable } from '@/baseTypes';

export const appActionCreators = {
  login: createAction<AppTypes.UserAuthParams>(AppActionTypes.LOGIN),
  signInWithGoogle: createAction(AppActionTypes.SIGN_IN_WITH_GOOGLE),
  initialize: createAction(AppActionTypes.INIT),
  setInitialize: createAction<boolean>(AppActionTypes.SET_INIT),
  logout: createAction(AppActionTypes.LOGOUT),
  setFetching: createAction<boolean>(AppActionTypes.SET_FETCHING),
  signUp: createAction<AppTypes.UserAuthParams>(AppActionTypes.SIGN_UP),
  setUser: createAction<Nullable<AppTypes.UserInfo>>(AppActionTypes.SET_USER),
  updateUser: createAction<Nullable<AppTypes.EditableInfo>>(AppActionTypes.UPDATE_USER),
  setError: createAction<string>(AppActionTypes.SET_ERROR),
  cancelSubscription: createAction(AppActionTypes.CANCEL_SUBSCRIPTION),
};

export type AppActions = InferActionsType<typeof appActionCreators>;