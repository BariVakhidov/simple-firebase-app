import React, { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { Paths } from "@/constants/paths";

interface Props {
	isAuth: boolean;
}

export const ProtectedComponent: FC<Props> = ({ isAuth }) => {
	if (!isAuth) {
		return <Navigate replace to={Paths.LOGIN} />;
	}

	return <Outlet />;
};
