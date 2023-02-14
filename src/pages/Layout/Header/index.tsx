import React, { FC, memo } from "react";
import { Layout } from "antd";

import { UserInformation } from "@/pages/Layout/Header/UserInformation";
import { AppNav } from "@/pages/Layout/Nav";
import { appSelectors } from "@/redux/app/selectors";
import { useAppSelector } from "@/redux/store";
import logo from "@Assets/images/logo.png";

import styles from "./Header.module.scss";

const { Header } = Layout;

export const AppHeader: FC = memo(() => {
	const user = useAppSelector(appSelectors.getUser);

	return (
		<Header className={styles.header}>
			<div className={styles.logo}>
				<img alt="" src={logo} />
			</div>
			<AppNav />
			<UserInformation user={user} />
		</Header>
	);
});
