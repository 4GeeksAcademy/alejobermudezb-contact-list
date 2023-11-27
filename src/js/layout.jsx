import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "./views/Home.jsx";

import injectContext from "./store/appContext";
import CallAddNewContact from "./views/CallAddNewContact.js";
import CallContactCard from "./views/CallContactCard.js";
import CallUpdateContact from "./views/CallUpdateContact.js";
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				
					<Navbar />
					<Routes>
						<Route exact path="/" element={<Home />} />
						{/* <Route path="/demo" element={<Demo />} />
						<Route path="/single/:theid" element={<Single />} /> */}
						<Route exact path="/CallContactCard" element={<CallContactCard />} />
						<Route exact path="/CallAddNewContact" element={<CallAddNewContact />} />
						<Route exact path="/CallUpdateContact" element={<CallUpdateContact/>} />
						<Route exact path="*" element={<h1>Not found!</h1>} />
					</Routes>
					<Footer />
				
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);