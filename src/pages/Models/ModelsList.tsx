import React, { memo, useCallback, useState } from "react";
import { Row } from "antd";
import { useTranslation } from "react-i18next";

import type { Nullable } from "@/baseTypes";
import type { Model, SearchModelsResponse } from "@/client/SketchfabClient/sketchfabClient-types";
import { ModelComponent } from "@/pages/Models/Model";
import { RedirectPopUp } from "@/pages/Models/PopUp/RedirectPopUp";
import { appSelectors } from "@/redux/app/selectors";
import { modelsActionCreators } from "@/redux/models/action-creators";
import { modelsSelectors } from "@/redux/models/selectors";
import type { FavoriteModel } from "@/redux/models/types";
import { useAppDispatch, useAppSelector } from "@/redux/store";

interface Props {
	modelsSearch: Nullable<SearchModelsResponse>;
	setSelectedModel: (model: Model) => void;
}

export const ModelsList = memo<Props>(({ modelsSearch, setSelectedModel }) => {
	const [isPopUpOpened, setIsPopUpOpened] = useState(false);
	const userFavoritesModels = useAppSelector(modelsSelectors.getUserFavoritesModels);
	const user = useAppSelector(appSelectors.getUser);
	const dispatch = useAppDispatch();
	const { t } = useTranslation("models");

	const onChangeModelState = useCallback(
		(model: FavoriteModel) => {
			if (user) {
				dispatch(modelsActionCreators.changeModelCondition({ model, userId: user.uid }));
			} else {
				setIsPopUpOpened(true);
			}
		},
		[dispatch, user]
	);
	const onPopUpClose = () => setIsPopUpOpened(false);

	if (!modelsSearch) {
		return null;
	}

	if (!modelsSearch.results.length) {
		return <div>{t("emptyResults")}</div>;
	}

	return (
		<>
			<Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]} justify={"space-between"}>
				{modelsSearch.results.map((model) => (
					<ModelComponent
						key={model.uid}
						model={model}
						user={user}
						userFavoritesModels={userFavoritesModels}
						onChangeModelState={onChangeModelState}
						onModelClick={setSelectedModel}
					/>
				))}
			</Row>
			{isPopUpOpened && <RedirectPopUp onClose={onPopUpClose} />}
		</>
	);
});
