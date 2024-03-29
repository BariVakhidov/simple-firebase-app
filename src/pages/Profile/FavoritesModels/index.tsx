import React, { memo } from "react";
import { Avatar, Card, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";
import { useTranslation } from "react-i18next";
import { HeartFilled } from "@ant-design/icons";

import { SetFirebaseModelRequest } from "@/firebaseApp/types";
import { modelsActionCreators } from "@/redux/models/action-creators";
import { modelsSelectors } from "@/redux/models/selectors";
import { useAppDispatch, useAppSelector } from "@/redux/store";

import styles from "./FavoritesModels.module.scss";

interface Props {
	userId: string;
}

export const FavoritesModels = memo<Props>(({ userId }) => {
	const userFavoritesModels = useAppSelector(modelsSelectors.getUserFavoritesModels);
	const dispatch = useAppDispatch();
	const { t } = useTranslation("profile");
	const onDelete = (params: SetFirebaseModelRequest) => dispatch(modelsActionCreators.changeModelCondition(params));

	if (!userFavoritesModels.length) {
		return <div>{t("emptyModels")}</div>;
	}
	return (
		<Row className={styles.wrapper} gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]} justify="start">
			{userFavoritesModels.map((model) => (
				<Col key={model.uid} span={6}>
					<Card
						hoverable
						cover={<img alt="" src={model.imageUrl} />}
						actions={[
							<HeartFilled
								key={"like"}
								title={"Delete model"}
								onClick={() => onDelete({ model, userId })}
							/>,
						]}
					>
						<Meta avatar={<Avatar src={model.userAvatarUrl} />} title={model.name} />
					</Card>
				</Col>
			))}
		</Row>
	);
});
