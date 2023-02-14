import { captureException, captureMessage } from "@sentry/react";
import { CaptureContext } from "@sentry/types";

export const loggingService = {
	handleError<T>(error: T, captureContext?: CaptureContext) {
		console.error(error);
		captureException(error, captureContext);
	},

	postMessage(message: string, captureContext?: CaptureContext) {
		captureMessage(message, captureContext);
	},
};
