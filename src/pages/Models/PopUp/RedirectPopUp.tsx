import React, { FC, memo, useEffect } from "react";
import { Button, Modal, Space } from "antd";
import { useNavigate } from "react-router";

import { Paths } from "@/constants/paths";

import styles from "./PopUp.module.scss";

interface Props {
	onClose: () => void;
}

export const RedirectPopUp: FC<Props> = memo(({ onClose }) => {
	const navigate = useNavigate();

	useEffect(() => {
		return () => {
			onClose();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Modal className={styles.modal} footer={null} onCancel={onClose}>
			<div className={styles.content}>
				<span>To add models in favorites, you need to sign in or sing up</span>
				<Space>
					<Button type="primary" onClick={() => navigate(Paths.LOGIN)}>
						Sign In
					</Button>
					<Button type="primary" onClick={() => navigate(Paths.REGISTRATION)}>
						Sign Up
					</Button>
				</Space>
			</div>
		</Modal>
	);
});
