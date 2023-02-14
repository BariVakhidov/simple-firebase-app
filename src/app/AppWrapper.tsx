import React, { FC, memo, Profiler, useEffect } from "react";
import { Spin } from "antd";

import { App } from "@/app/App";
import { appActionCreators } from "@/redux/app/action-creators";
import { appSelectors } from "@/redux/app/selectors";
import { modelsActionCreators } from "@/redux/models/action-creators";
import { useAppDispatch, useAppSelector } from "@/redux/store";

export const AppWrapper: FC = memo(() => {
	const user = useAppSelector(appSelectors.getUser);
	const initialized = useAppSelector(appSelectors.getIsInitialized);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(appActionCreators.initialize());
	}, [dispatch]);

	useEffect(() => {
		if (user) {
			dispatch(appActionCreators.initializeUserModels(user.uid));
			return () => {
				dispatch(modelsActionCreators.setFavoritesModels([]));
			};
		}
	}, [user, dispatch]);

	return (
		<Profiler
			id={"App"}
			onRender={(id, phase, actualTime) => {
				console.log(`${id}, phase: ${phase}, actualDuration: ${actualTime}`);
			}}
		>
			{initialized ? <App /> : <Spin size="large" />}
		</Profiler>
	);
});
