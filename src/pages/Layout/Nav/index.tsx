import React, { FC, memo } from "react";
import { Menu } from "antd";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import { Paths } from "@/constants/paths";

import styles from "./Nav.module.scss";

export const AppNav: FC = memo(() => {
	const location = useLocation();
	return (
		<Menu
			className={styles.menu}
			defaultSelectedKeys={["/"]}
			mode="horizontal"
			selectedKeys={[location.pathname]}
			theme="dark"
			items={[
				{ key: Paths.MODELS, label: <Link to={Paths.MODELS}>Models</Link> },
				{ key: Paths.PROFILE, label: <Link to={Paths.PROFILE}>Profile</Link> },
			]}
		/>
	);
});
