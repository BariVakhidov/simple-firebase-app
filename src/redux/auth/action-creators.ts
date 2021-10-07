import { createAction } from '@reduxjs/toolkit';
import { AuthActionTypes } from '@/redux/auth/action-types';
import { InferActionsType } from '@/redux/store';

export const authActionCreators = {
  login: createAction(AuthActionTypes.LOGIN),
  logout: createAction(AuthActionTypes.LOGOUT),
  setFetching: createAction<boolean>(AuthActionTypes.SET_FETCHING),
  signUp: createAction<boolean>(AuthActionTypes.SIGN_UP),
};

export type AuthActions = InferActionsType<typeof authActionCreators>;