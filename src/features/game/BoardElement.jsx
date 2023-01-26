import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setArray } from "./GameSlice";
import { setChange } from "./BoardSlice";
import { setAbility, setTrue } from "./DisableBoardSlice";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import clickmusic from "../Sounds/click.wav";
import { Howl, Howler } from "howler";
export default function (props) {
	var sound = new Howl({
		src: [clickmusic],
	});
	// useEffect(() => {
	// 	sound.play();
	// 	// Howler.volume(0.05);
	// }, []);
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
	useEffect(() => {
		return () => {
			window.addEventListener("beforeunload", function (e) {
				localStorage.clear();
			});
		};
	});
	const array = useSelector((state) => state.boardelements.elements);
	const disabled = useSelector((state) => state.ability.disabled);
	const oppo = useSelector((state) => state.opponent.opponent);
	const [classname, setClassname] = useState(classesOfBoard[props.id]);
	useEffect(() => {
		setClassname(classesOfBoard[props.id]);
	}, []);
	// const [disabled, setDisabled] = useState(false);
	const dispatch = useDispatch();
	return (
		<>
			<div
				className={classname}
				onClick={() => {
					if (!disabled) {
						if (!oppo) {
							return;
						}
						if (array[props.id] == "X" || array[props.id] == "O") {
							return;
						}

						dispatch(
							setArray({
								id: props.id,
								value: localStorage.getItem("sym")
									? localStorage.getItem("sym")
									: "X",
							})
						);
						dispatch(setChange());
						dispatch(setTrue());
						sound.play();
						sound.volume(4);
					}
				}}
				onMouseEnter={() => {
					if (!classname.includes("hover_on_board_element")) {
						setClassname(classname + " hover_on_board_element");
					}
				}}
				onMouseLeave={() => {
					// let string = classname.split(" ");
					// string.pop();
					// setClassname(string.join(" "));

					setClassname(classesOfBoard[props.id]);
				}}
			>
				<div className="boardElemntsDiv">
					<div className="boardSigns">
						{array[props.id] == "X" ? (
							<ClearOutlinedIcon
								style={{
									fontSize: "5rem",
									padding: 0,
								}}
							/>
						) : (
							""
						)}
						{array[props.id] == "O" ? (
							<CircleOutlinedIcon
								style={{
									fontSize: "5rem",
									padding: 0,
								}}
							/>
						) : (
							""
						)}
					</div>
				</div>
			</div>
		</>
	);
}
