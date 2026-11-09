import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./resources/sass/site.scss";

import TemplateHomepage from "./html/pages/templates/TemplateHomepage";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<HelmetProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<TemplateHomepage />} />
				</Routes>
			</BrowserRouter>
		</HelmetProvider>
	</React.StrictMode>
);
