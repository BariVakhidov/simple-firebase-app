import { createReducer, Reducer } from "@reduxjs/toolkit";

import { appActionCreators } from "@/redux/app/action-creators";
import { AppTypes } from "@/redux/app/types";

const initialState: Readonly<AppTypes.AppState> = {
	user: null,
	isAuth: false,
	initialized: false,
	isFetching: false,
	error: null,
};

export const appReducer: Reducer<AppTypes.AppState> = createReducer(initialState, (builder) => {
	builder
		.addCase(appActionCreators.setFetching, (state, action) => {
			state.isFetching = action.payload;
		})
		.addCase(appActionCreators.setInitialize, (state, action) => {
			state.initialized = action.payload;
		})
		.addCase(appActionCreators.setError, (state, action) => {
			state.error = action.payload;
		})
		.addCase(appActionCreators.setUser, (state, action) => {
			state.user = action.payload;
		});
});
