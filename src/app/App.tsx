import React, { FC, memo } from "react";
import { Route, Routes } from "react-router-dom";

import { Paths, privateRoutes } from "@/constants/paths";
import { AppLayout } from "@/pages/Layout";
import Login from "@/pages/Login";
import { Models } from "@/pages/Models";
import { NotFound } from "@/pages/NotFound";
import Registration from "@/pages/Registration";
import { useAppSelector } from "@/redux/store";
import { ProtectedComponent } from "@Components/protectedRoute";

export const App: FC = memo(() => {
	const isAuth = useAppSelector((state) => state.app.isAuth);

	return (
		<AppLayout>
			<Routes>
				<Route element={<ProtectedComponent isAuth={isAuth} />}>
					{privateRoutes.map((route) => (
						<Route element={route.element} key={route.path} path={route.path} />
					))}
				</Route>
				<Route element={<Login />} path={Paths.LOGIN} />
				<Route element={<Registration />} path={Paths.REGISTRATION} />
				<Route element={<Models />} path={Paths.MODELS} />
				<Route element={<NotFound />} path="*" />
			</Routes>
		</AppLayout>
	);
});
