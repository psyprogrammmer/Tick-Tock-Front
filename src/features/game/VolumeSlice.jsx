import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: 0.03,
};

export const VolumeSlice = createSlice({
	name: "vol",
	initialState,
	reducers: {
		setVolume: (state, action) => {
			console.log("action: " + action.payload);
			state.value = action.payload / 1000;
		},
	},
});

export const { setVolume } = VolumeSlice.actions;

export default VolumeSlice.reducer;
