import React, { FC, memo, Profiler, useEffect } from "react";
import { Spin } from "antd";

import { App } from "@/app/App";
import { appActionCreators } from "@/redux/app/action-creators";
import { modelsActionCreators } from "@/redux/models/action-creators";
import { useAppDispatch, useAppSelector } from "@/redux/store";
//3
export const AppWrapper: FC = memo(() => {
	const { initialized, user } = useAppSelector((state) => state.app);
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
