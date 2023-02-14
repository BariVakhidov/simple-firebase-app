import React, { FC, memo } from "react";
import { Button } from "antd";
import { useTranslation } from "react-i18next";

import styles from "./ErrorFallback.module.scss";

interface Props {
	error: unknown;
}

const ErrorFallback: FC<Props> = () => {
	const { t } = useTranslation("common");

	const handleReloadPage = () => window.location.reload();

	return (
		<div className={styles.fallback}>
			<span>{t("errors.appError")}</span>
			<Button type="primary" onClick={handleReloadPage}>
				{t("reload")}
			</Button>
		</div>
	);
};

export default memo(ErrorFallback);
