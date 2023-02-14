import { AppState } from "@/redux/store";

const getUser = (state: AppState) => state.app.user;
const getError = (state: AppState) => state.app.error;
const getIsInitialized = (state: AppState) => state.app.initialized;
const getIsFetching = (state: AppState) => state.app.isFetching;

export const appSelectors = {
	getUser,
	getIsInitialized,
	getIsFetching,
	getError,
};
