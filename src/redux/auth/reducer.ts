import { createReducer, Reducer } from '@reduxjs/toolkit';
import { AuthState } from '@/redux/auth/types';
import { authActionCreators, AuthActions } from '@/redux/auth/action-creators';

const initialState: Readonly<AuthState> = {
  isAuth: false,
  isFetching: false,
};

export const authReducer: Reducer<AuthState, AuthActions> = createReducer(initialState, builder => {
  builder
    .addCase(authActionCreators.setFetching, (state, action) => {
      state.isFetching = action.payload;
    })
    .addCase(authActionCreators.logout, () => initialState);
});
