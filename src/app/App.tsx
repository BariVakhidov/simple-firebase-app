import React, { lazy, memo, Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";
import { ErrorBoundary, withSentryReactRouterV6Routing } from "@sentry/react";

import { Paths, privateRoutes } from "@/constants/paths";
import { AppLayout } from "@/pages/Layout";
import { appSelectors } from "@/redux/app/selectors";
import { useAppSelector } from "@/redux/store";
import { Loader } from "@Components/loader";
import { ProtectedComponent } from "@Components/protectedRoute";
import ErrorFallback from "@Pages/ErrorFallback";

const Models = lazy(() => import("@/pages/Models"));
const Login = lazy(() => import("@/pages/Login"));
const Registration = lazy(() => import("@/pages/Registration"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const SentryRoutes = withSentryReactRouterV6Routing(Routes);

export const App = memo(() => {
	const user = useAppSelector(appSelectors.getUser);
	const { i18n } = useTranslation();

	useEffect(() => {
		document.documentElement.lang = i18n.language;
	}, [i18n.language]);

	return (
		<ErrorBoundary fallback={(errorData) => <ErrorFallback error={errorData.error} />}>
			<AppLayout>
				<Suspense fallback={<Loader />}>
					<SentryRoutes>
						<Route element={<ProtectedComponent isAuth={!!user} />}>
							{privateRoutes.map((route) => (
								<Route element={route.element} key={route.path} path={route.path} />
							))}
						</Route>
						<Route element={<Login />} path={Paths.LOGIN} />
						<Route element={<Registration />} path={Paths.REGISTRATION} />
						<Route element={<Models />} path={`${Paths.MODELS}/*`} />
						<Route element={<NotFound />} path="*" />
					</SentryRoutes>
				</Suspense>
			</AppLayout>
		</ErrorBoundary>
	);
});
