import React, { memo, useCallback, useState } from "react";
import { Col, Descriptions, Image, Row } from "antd";
import { EditOutlined } from "@ant-design/icons";

import { EditInfo } from "@/pages/Profile/EditInfo";
import { FavoritesModels } from "@/pages/Profile/FavoritesModels";
import { appActionCreators } from "@/redux/app/action-creators";
import { appSelectors } from "@/redux/app/selectors";
import { AppTypes } from "@/redux/app/types";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import avatar from "@Assets/images/no-photo.png";
import { PageWrapper } from "@Components/pageWrapper";
import { Preloader } from "@Components/preloader";

import styles from "./Profile.module.scss";
import UserInfo = AppTypes.UserInfo;

const getUserInfo = (user: UserInfo) => {
	const { email, photoURL, phoneNumber, displayName } = user;
	return { email, photoURL, phoneNumber, displayName };
};

export const Profile = memo(() => {
	const [isEditMode, setEditMode] = useState(false);
	const user = useAppSelector(appSelectors.getUser);
	const isFetching = useAppSelector(appSelectors.getIsFetching);
	const dispatch = useAppDispatch();

	const activateEditMode = useCallback(() => setEditMode(true), []);
	const deactivateEditMode = useCallback(() => setEditMode(false), []);
	const updateUser = useCallback(
		(values: AppTypes.EditableInfo) => {
			dispatch(appActionCreators.updateUser(values));
			setEditMode(false);
		},
		[dispatch]
	);

	if (!user) {
		return null;
	}

	return (
		<PageWrapper>
			<Row align="top" justify="space-between">
				<Col>
					<Image preview={!!user.photoURL} src={user.photoURL ? user.photoURL : avatar} width={200} />
				</Col>
				{isEditMode ? (
					<EditInfo deactivateEditMode={deactivateEditMode} updateUser={updateUser} user={user} />
				) : (
					<>
						<Col>
							<Descriptions bordered column={1} title="User Info">
								{Object.entries(getUserInfo(user)).map(
									(i) =>
										i[1] && (
											<Descriptions.Item key={i[0]} label={i[0]}>
												{i[1]}
											</Descriptions.Item>
										)
								)}
							</Descriptions>
						</Col>
						<Col>
							<EditOutlined className={styles.icon} onClick={activateEditMode} />
						</Col>
					</>
				)}
			</Row>
			<FavoritesModels userId={user.uid} />
			{isFetching && <Preloader absolute />}
		</PageWrapper>
	);
});
