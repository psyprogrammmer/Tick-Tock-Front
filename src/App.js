import React, { useEffect } from "react";
import "./App.css";
import Game from "./features/game/Game";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./features/Login";
import gif from "./giphy.gif";
import Background from "./features/Background";

function App() {
	return (
		<div className="App">
			{/* <div className="bg_animation"></div> */}
			{/* <div className="backgroundEffect"></div> */}
			{/* <Background /> */}
			<Background />
			<BrowserRouter>
				<Routes>
					<Route exact path="/" element={<Game />} />
					<Route exact path="/login" element={<Login />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
