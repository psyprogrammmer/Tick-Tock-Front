import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	opponent: "",
};

export const ResultSlice = createSlice({
	name: "opponent",
	initialState,
	reducers: {
		setOpponent: (state, action) => {
			state.opponent = action.payload;
		},
	},
});

export const { setOpponent } = ResultSlice.actions;

export default ResultSlice.reducer;
