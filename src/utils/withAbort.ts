import { CANCEL } from "redux-saga";

export interface PromiseWithCancel<T> extends Promise<T> {
	[key: string]: () => void;
}

export const withAbort = <T>(createAxiosRequest: (signal: AbortSignal) => Promise<T>): PromiseWithCancel<T> => {
	const controller = new AbortController();
	const promise = createAxiosRequest(controller.signal) as PromiseWithCancel<T>;
	promise[CANCEL] = () => controller.abort();
	return promise;
};
