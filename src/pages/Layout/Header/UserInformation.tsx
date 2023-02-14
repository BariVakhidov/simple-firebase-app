import React, { memo } from "react";
import { Avatar, Button, Space } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { UserOutlined } from "@ant-design/icons";

import { Nullable } from "@/baseTypes";
import { Paths } from "@/constants/paths";
import { appActionCreators } from "@/redux/app/action-creators";
import { AppTypes } from "@/redux/app/types";
import { useAppDispatch } from "@/redux/store";

import styles from "./Header.module.scss";

interface Props {
	user: Nullable<AppTypes.UserInfo>;
}

export const UserInformation = memo<Props>(({ user }) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { t } = useTranslation("common");

	const logout = () => dispatch(appActionCreators.logout());

	if (!user) {
		return (
			<Space>
				<Button onClick={() => navigate(Paths.LOGIN)}>{t("signIn")}</Button>
				<Button onClick={() => navigate(Paths.REGISTRATION)}>{t("signUp")}</Button>
			</Space>
		);
	}

	return (
		<Space>
			<Avatar icon={!user.photoURL && <UserOutlined />} src={user.photoURL} />
			<span className={styles.name}>{user.displayName}</span>
			<Button onClick={logout}>{t("logout")}</Button>
		</Space>
	);
});
