import React, { FC, memo, useEffect } from "react";
import { Button, Modal, Space } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import { Paths } from "@/constants/paths";

import styles from "./PopUp.module.scss";

interface Props {
	onClose: () => void;
}

export const RedirectPopUp: FC<Props> = memo(({ onClose }) => {
	const navigate = useNavigate();
	const { t } = useTranslation("models");

	useEffect(() => {
		return () => {
			onClose();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Modal className={styles.modal} footer={null} onCancel={onClose}>
			<div className={styles.content}>
				<span>{t("addToFavoriteWarning")}</span>
				<Space>
					<Button type="primary" onClick={() => navigate(Paths.LOGIN)}>
						{t("navigateToSignIn")}
					</Button>
					<Button type="primary" onClick={() => navigate(Paths.REGISTRATION)}>
						{t("navigateToSignUp")}
					</Button>
				</Space>
			</div>
		</Modal>
	);
});
