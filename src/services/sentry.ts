import React from "react";
import { createRoutesFromChildren, matchRoutes, useLocation, useNavigationType } from "react-router-dom";
import { init, reactRouterV6Instrumentation } from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

init({
	dsn: process.env.REACT_APP_SENTRY_URL,
	integrations: [
		new BrowserTracing({
			routingInstrumentation: reactRouterV6Instrumentation(
				React.useEffect,
				useLocation,
				useNavigationType,
				createRoutesFromChildren,
				matchRoutes
			),
		}),
	],
	tracesSampleRate: 1.0,
});
