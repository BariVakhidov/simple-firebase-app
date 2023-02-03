import React, { FC, memo } from "react";
import cn from "classnames";

import { WithChildren } from "@/baseTypes";

import styles from "./Wrapper.module.scss";

interface Props {
	style: string;
	onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
	center: boolean;
}

export const PageWrapper: FC<Partial<WithChildren<Props>>> = memo(({ children, onKeyDown, style, center }) => {
	return (
		<div className={cn(styles.wrapper, style, center && styles.center)} onKeyDown={onKeyDown}>
			{children}
		</div>
	);
});
