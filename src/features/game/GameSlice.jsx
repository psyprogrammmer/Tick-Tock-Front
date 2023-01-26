import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	elements: ["", "", "", "", "", "", "", "", ""],
};

export const GameSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {
		setArray: (state, action) => {
			state.elements[action.payload.id] = action.payload.value;
		},
		setFullArray: (state, array) => {
			state.elements = array.payload;
		},
	},
});

export const { setArray, setFullArray } = GameSlice.actions;

export default GameSlice.reducer;
