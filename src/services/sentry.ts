import { init } from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

init({
	dsn: process.env.REACT_APP_SENTRY_URL,
	integrations: [new BrowserTracing()],
	tracesSampleRate: 1.0,
});
