import React, { FC, memo } from "react";

import { WithChildren } from "@/baseTypes";
import { PageWrapper } from "@Components/pageWrapper";

import styles from "./FormWrapper.module.scss";

export const FormWrapper: FC<WithChildren> = memo(({ children }) => {
	return <PageWrapper style={styles.container}>{children}</PageWrapper>;
});
