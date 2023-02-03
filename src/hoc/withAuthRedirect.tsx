import React from "react";
import { Navigate } from "react-router-dom";

import { Paths } from "@/constants/paths";
import { useAppSelector } from "@/redux/store";
import { Preloader } from "@Components/preloader";

export function withAuthRedirect(Component: React.ComponentType): React.ComponentType {
	return () => {
		const { user, isFetching } = useAppSelector((state) => state.app);
		if (user) {
			return <Navigate to={Paths.PROFILE} />;
		}
		return (
			<>
				<Component />

				{isFetching && <Preloader absolute />}
			</>
		);
	};
}
