import React from "react";

import { Profile } from "@/pages/Profile";

export enum Paths {
	PROFILE = "/profile",
	LOGIN = "/login",
	REGISTRATION = "/registration",
	MODELS = "/models",
}

interface Route {
	path: Paths;
	element: JSX.Element;
}

export const privateRoutes: Route[] = [
	{
		element: <Profile />,
		path: Paths.PROFILE,
	},
];
