import React, { memo } from "react";
import cn from "classnames";

import styles from "./Loader.module.scss";

interface Props {
	className?: string;
}

export const Loader = memo<Props>(({ className }) => {
	return <div className={cn(styles.loader, className)} />;
});
