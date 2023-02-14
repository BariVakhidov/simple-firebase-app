import React, { FC, useEffect } from "react";
import { Layout, Modal } from "antd";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import { ErrorBoundary } from "@sentry/react";

import { WithChildren } from "@/baseTypes";
import { AppHeader } from "@/pages/Layout/Header";
import { appActionCreators } from "@/redux/app/action-creators";
import { appSelectors } from "@/redux/app/selectors";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import ErrorFallback from "@Pages/ErrorFallback";

import styles from "./Layout.module.scss";

const { Content, Footer } = Layout;

const currentYear = new Date().getFullYear();

export const AppLayout: FC<WithChildren> = ({ children }) => {
	const error = useAppSelector(appSelectors.getError);
	const dispatch = useAppDispatch();
	const { t } = useTranslation("common");

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
			<ErrorBoundary fallback={(errorData) => <ErrorFallback error={errorData.error} />}>
				<Content className="site-layout">
					<div className={cn("site-layout-background", styles.content)}>{children}</div>
				</Content>
			</ErrorBoundary>
			<Footer className={styles.footer}>{t("footerText", { count: currentYear })}</Footer>
		</Layout>
	);
};
