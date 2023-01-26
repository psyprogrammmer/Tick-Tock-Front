import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import VolumeUp from "@mui/icons-material/VolumeUp";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setVolume } from "./VolumeSlice";
const Input = styled(MuiInput)`
	width: 42px;
`;

export default function InputSlider() {
	const [value, setValue] = React.useState(30);
	const val = useSelector((state) => state.volume.value);
	var dispatch = useDispatch();
	const handleSliderChange = (event, newValue) => {
		setValue(newValue);
		dispatch(setVolume(newValue));
		console.log(newValue);
	};

	const handleInputChange = (event) => {
		setValue(event.target.value === "" ? "" : Number(event.target.value));
	};

	const handleBlur = () => {
		if (value < 0) {
			setValue(0);
		} else if (value > 100) {
			setValue(100);
		}
	};
	const [wid, setWid] = useState(275);
	useEffect(() => {
		window.onresize = () => {
			console.log(window.innerWidth);
			if (window.innerWidth < 545) {
				setWid(200);
			}
			if (window.innerWidth < 410) {
				setWid(175);
			}
		};
	}, []);

	return (
		<>
			<Box
				sx={{ width: wid }}
				backgroundColor="white"
				style={{ padding: "10px" }}
				borderRadius={2}
			>
				<Grid container spacing={2} alignItems="center">
					<Grid item>
						<VolumeUp />
					</Grid>
					<Grid item xs>
						<Slider
							color="error"
							value={typeof value === "number" ? value : 0}
							onChange={handleSliderChange}
							aria-labelledby="input-slider"
						/>
					</Grid>
					<Grid item>
						<Input
							value={value}
							size="small"
							onChange={handleInputChange}
							onBlur={handleBlur}
							inputProps={{
								step: 10,
								min: 0,
								max: 100,
								type: "number",
								"aria-labelledby": "input-slider",
							}}
						/>
					</Grid>
				</Grid>
			</Box>
		</>
	);
}
