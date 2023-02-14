import React, { memo } from "react";

import notFound from "@Assets/images/404.png";
import { PageWrapper } from "@Components/pageWrapper";

const NotFound = memo(() => {
	return (
		<PageWrapper center>
			<img alt="" src={notFound} />
		</PageWrapper>
	);
});

export default NotFound;
