import React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import check from "./Winner";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Fab from "@mui/material/Fab";
import ReplayIcon from "@mui/icons-material/Replay";
import music from "./music.mp3";
import { setAbility, setFalse, setTrue } from "./DisableBoardSlice";
import BoardElement from "./BoardElement";
import Result from "./Result";
import { useNavigate } from "react-router-dom";
import LowerResult from "./Lower_Result";
import useWebSocket, { ReadyState } from "react-use-websocket";
import Chat from "./Chat";
import { setArray, setFullArray } from "./GameSlice";
import isBlank from "./Messages";
const Game = () => {
	const navigate = useNavigate();
	useEffect(() => {
		if (!localStorage.getItem("name") || !localStorage.getItem("room")) {
			navigate("/login");
		}
	}, []);
	const array = useSelector((state) => state.boardelements.elements);
	const change = useSelector((state) => state.change.change);
	var room = localStorage.getItem("room");
	var symbols = localStorage.getItem("sym");

	const [result, setResult] = useState({
		classs: "fullres",
		title: "",
		msg: "",
	});
	const [win, setWin] = useState(true);
	const [socketUrl, setSocketUrl] = useState(
		"ws://127.0.0.1:8000/ws/board/" + room + "_board" + "/"
	);
	const [messageHistory, setMessageHistory] = useState([]);
	const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
	const dispatch = useDispatch();
	useEffect(() => {
		if (lastMessage !== null) {
			setMessageHistory((prev) => prev.concat(lastMessage));
			let arr = JSON.parse(lastMessage.data).array;
			let syms = JSON.parse(lastMessage.data).sym;

			console.log("letest symbol", syms);
			if (syms !== localStorage.getItem("sym")) {
				dispatch(setFalse());
			}
			if (isBlank(arr)) {
				console.log("True");
				dispatch(setFalse());
			}
			dispatch(setFullArray(arr));
			if (check(arr)[0] && check(arr)[1] == localStorage.getItem("sym")) {
				setResult((prev) => {
					return {
						...prev,
						classs: "fullres pass",
						title: "Bingo !😍",
						msg: "Congratulations!🤩",
					};
				});
				setWin(false);
			}
			if (check(arr)[0] && check(arr)[1] != localStorage.getItem("sym")) {
				console.log("loss");
				setResult((prev) => {
					return {
						...prev,
						classs: "fullres fail",
						title: "Oh nooo !😥",
						msg: "Better luck next time🙂",
					};
				});
				setWin(false);
			}
			if (check(arr)[2]) {
				setResult((prev) => {
					return {
						...prev,
						classs: "fullres drawmatch",
						title: "Match Draw !😐",
						msg: "Better luck next time😶",
					};
				});
				setWin(false);
			}
		}
	}, [lastMessage, setMessageHistory]);
	useEffect(() => {
		console.log(array);
		sendMessage(JSON.stringify({ array: array, sym: symbols }));
	}, [change]);

	var classesOfBoard = [
		"posn top left",
		"posn top vert",
		"posn top right",
		"posn left horiz",
		"middle posn vert horiz",
		"posn right horiz",
		"posn bot left",
		"vert posn bot downvert",
		"posn bot right",
	];
	return (
		<>
			{!win ? (
				<div className={result.classs}>
					<div>
						<span className="result_title">{result.title}</span>
						<span className="result_msg">{result.msg}</span>
						<span>
							<Fab onClick={() => window.location.reload()}>
								<ReplayIcon />
							</Fab>
						</span>
					</div>
				</div>
			) : (
				<></>
			)}
			{win ? (
				<>
					<div class="total_bg">
						<div className="main">
							<div id="res" className="boxes result">
								<Result />
							</div>
							<div id="box" className="boxes">
								{classesOfBoard.map((val, index) => {
									return <BoardElement cname={val} key={index} id={index} />;
								})}
							</div>
							<Chat />
							<LowerResult />
						</div>
						<div class="bg_animation">
							<div class="glowing">
								<span class="glow1"></span>
								<span class="glow1"></span>
								<span class="glow1"></span>
								<span class="glow1"></span>
								<span class="glow1"></span>
								<span class="glow1"></span>
								<span class="glow1"></span>
								<span class="glow1"></span>
							</div>
							<div class="glowing">
								<span class="glow1"></span>
								<span class="glow1"></span>
								<span class="glow1"></span>
								<span class="glow1"></span>
								<span class="glow1"></span>
								<span class="glow1"></span>
								<span class="glow1"></span>
								<span class="glow1"></span>
							</div>
							<div class="glowing">
								<span class="glow1"></span>
								<span class="glow1"></span>
								<span class="glow1"></span>
								<span class="glow1"></span>
								<span class="glow1"></span>
								<span class="glow1"></span>
								<span class="glow1"></span>
								<span class="glow1"></span>
							</div>
						</div>
					</div>
				</>
			) : (
				<></>
			)}
		</>
	);
};

export default Game;
