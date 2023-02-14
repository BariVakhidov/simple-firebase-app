import React, { memo } from "react";
import { Menu } from "antd";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import { Paths } from "@/constants/paths";
import { appSelectors } from "@/redux/app/selectors";
import { useAppSelector } from "@/redux/store";

import styles from "./Nav.module.scss";

export const AppNav = memo(() => {
	const location = useLocation();
	const user = useAppSelector(appSelectors.getUser);
	const { t } = useTranslation("common");

	return (
		<Menu
			className={styles.menu}
			defaultSelectedKeys={["/"]}
			mode="horizontal"
			selectedKeys={[location.pathname]}
			theme="dark"
			items={[
				{ key: Paths.MODELS, label: <Link to={Paths.MODELS}>{t("nav.models")}</Link> },
				{ key: Paths.PROFILE, label: <Link to={Paths.PROFILE}>{t("nav.profile")}</Link>, disabled: !user },
			]}
		/>
	);
});
