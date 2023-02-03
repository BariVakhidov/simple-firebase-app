import React from "react";
import whyDidYouRender from "@welldone-software/why-did-you-render";

if (process.env.DEBUG_RENDER === "true" && process.env.NODE_ENV === "development") {
	whyDidYouRender(React, {
		trackAllPureComponents: true,
		trackHooks: true,
		trackExtraHooks: [[require("react-redux"), "useSelector"]],
	});
}
