import React, { memo } from "react";
import { Avatar, Card, Col } from "antd";
import Meta from "antd/es/card/Meta";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";

import { Nullable } from "@/baseTypes";
import { SketchfabClientTypes } from "@/client/SketchfabClient/sketchfabClient-types";
import { AppTypes } from "@/redux/app/types";
import { ModelsTypes } from "@/redux/models/types";
import FavoriteModel = ModelsTypes.FavoriteModel;

interface Props {
	model: SketchfabClientTypes.Model;
	onModelClick: (model: SketchfabClientTypes.Model) => void;
	onChangeModelState: (model: FavoriteModel) => void;
	userFavoritesModels: ModelsTypes.FavoriteModel[];
	user: Nullable<AppTypes.UserInfo>;
}

export const Model = memo<Props>(({ model, onModelClick, onChangeModelState, userFavoritesModels }) => {
	const isFavorite = userFavoritesModels.find((i) => i.uid === model.uid);
	const { uid, name, thumbnails } = model;
	const imageUrl = thumbnails.images[0].url;
	const userAvatarUrl = model.user.avatar.images[0].url;

	const onAction = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
		e.stopPropagation();
		onChangeModelState({ uid, name, imageUrl, userAvatarUrl });
	};

	return (
		<Col span={6}>
			<Card
				hoverable
				cover={<img alt="" src={imageUrl} />}
				actions={[
					!isFavorite ? (
						<HeartOutlined key={"like"} onClick={onAction} />
					) : (
						<HeartFilled key={"like"} onClick={onAction} />
					),
				]}
				onClick={() => onModelClick(model)}
			>
				<Meta avatar={<Avatar src={model.user.avatar.images[0].url} />} title={model.name} />
			</Card>
		</Col>
	);
});
