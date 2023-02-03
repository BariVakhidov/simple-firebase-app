import React, { FC, memo, useEffect } from "react";
import { Layout, Modal } from "antd";
import cn from "classnames";

import { WithChildren } from "@/baseTypes";
import { AppHeader } from "@/pages/Layout/Header";
import { appActionCreators } from "@/redux/app/action-creators";
import { useAppDispatch, useAppSelector } from "@/redux/store";

import styles from "./Layout.module.scss";

const { Content, Footer } = Layout;

export const AppLayout: FC<WithChildren> = memo(({ children }) => {
	const { error } = useAppSelector((state) => state.app);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (error) {
			const modal = Modal.error({
				title: "Error!",
				content: error,
				onOk: () => dispatch(appActionCreators.setError("")),
			});
			return () => {
				modal.destroy();
			};
		}
	}, [error, dispatch]);

	return (
		<Layout className={styles.layout}>
			<AppHeader />
			<Content className="site-layout">
				<div className={cn("site-layout-background", styles.content)}>{children}</div>
			</Content>
			<Footer className={styles.footer}>Simple firebase app ©2021 Created by Bari</Footer>
		</Layout>
	);
});
