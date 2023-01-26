import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	change: false,
};

export const ChangeSlice = createSlice({
	name: "change",
	initialState,
	reducers: {
		setChange: (state) => {
			state.change = !state.change;
		},
	},
});

export const { setChange } = ChangeSlice.actions;

export default ChangeSlice.reducer;
