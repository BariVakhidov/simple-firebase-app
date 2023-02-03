import React, { FC, memo } from "react";

import notFound from "@Assets/images/404.png";
import { PageWrapper } from "@Components/pageWrapper";

export const NotFound: FC = memo(() => {
	return (
		<PageWrapper center>
			<img alt="" src={notFound} />
		</PageWrapper>
	);
});
