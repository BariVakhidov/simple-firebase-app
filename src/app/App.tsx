import React, { FC, memo } from "react";
import { Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "@sentry/react";

import { Paths, privateRoutes } from "@/constants/paths";
import { AppLayout } from "@/pages/Layout";
import Login from "@/pages/Login";
import { Models } from "@/pages/Models";
import { NotFound } from "@/pages/NotFound";
import Registration from "@/pages/Registration";
import { appSelectors } from "@/redux/app/selectors";
import { useAppSelector } from "@/redux/store";
import { ProtectedComponent } from "@Components/protectedRoute";
import ErrorFallback from "@Pages/ErrorFallback";

export const App: FC = memo(() => {
	const user = useAppSelector(appSelectors.getUser);

	return (
		<ErrorBoundary fallback={(errorData) => <ErrorFallback error={errorData.error} />}>
			<AppLayout>
				<Routes>
					<Route element={<ProtectedComponent isAuth={!!user} />}>
						{privateRoutes.map((route) => (
							<Route element={route.element} key={route.path} path={route.path} />
						))}
					</Route>
					<Route element={<Login />} path={Paths.LOGIN} />
					<Route element={<Registration />} path={Paths.REGISTRATION} />
					<Route element={<Models />} path={`${Paths.MODELS}/*`} />
					<Route element={<NotFound />} path="*" />
				</Routes>
			</AppLayout>
		</ErrorBoundary>
	);
});
