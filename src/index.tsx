import React, { FC, memo } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { AppWrapper } from "@/app/AppWrapper";
import { store } from "@/redux/store";

import "./style.css";

import "@/utils/wdyr";

const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error("Failed to find the root element");
}

const AppContainer: FC = memo(() => {
	return (
		<React.StrictMode>
			<BrowserRouter>
				<Provider store={store}>
					<AppWrapper />
				</Provider>
			</BrowserRouter>
		</React.StrictMode>
	);
});

const root = createRoot(rootElement);

root.render(<AppContainer />);
