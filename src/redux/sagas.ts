import axios, { AxiosError } from "axios";
import { AnyAction } from "redux";
import { call, delay, fork, put } from "@redux-saga/core/effects";

import { appActionCreators } from "@/redux/app/action-creators";
import { appSaga } from "@/redux/app/sagas";
import { modelsSaga } from "@/redux/models/sagas";
import { AppState } from "@/redux/store";
import { loggingService } from "@/services/loggingService";

export function* rootSaga() {
	yield fork(appSaga);
	yield fork(modelsSaga);
}

export interface BaseErrorResponse {
	errorType?: string;
	message?: string;
}

export interface TryCatchSagaOptions<K> {
	withProgress: boolean;
	withStore?: K;
	updateProgressAction: (payload: boolean) => AnyAction;
	withDelay?: boolean;
}

const getErrorMessage = (error: AxiosError): string => {
	if (error.response?.data && (error.response.data as BaseErrorResponse).message) {
		return (error.response.data as BaseErrorResponse).message ?? "";
	}
	if (error.response) {
		return error.response.statusText;
	}
	return error.message;
};

/**
 *
 * @param saga
 * @param options
 */
export function tryCatchSaga<A, K extends keyof AppState>(
	saga: (a: A, s?: AppState[K]) => void,
	options?: TryCatchSagaOptions<K>
) {
	return function* (a: A) {
		try {
			if (options?.withProgress) {
				yield put(options.updateProgressAction(true));
			}
			if (options?.withDelay) {
				yield delay(500);
			}
			yield call(saga, a);
		} catch (error: unknown) {
			loggingService.handleError(error);
			if (axios.isAxiosError(error)) yield put(appActionCreators.setError(getErrorMessage(error)));
		} finally {
			if (options?.withProgress) {
				yield put(options.updateProgressAction(false));
			}
		}
	};
}
