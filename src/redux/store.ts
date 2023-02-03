import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";

import { appReducer } from "@/redux/app/reducer";
import { modelsReducer } from "@/redux/models/reducer";
import { rootSaga } from "@/redux/sagas";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
	reducer: {
		app: appReducer,
		models: modelsReducer,
	},
	devTools: true,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
