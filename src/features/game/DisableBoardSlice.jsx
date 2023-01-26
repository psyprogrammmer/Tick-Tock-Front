import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	disabled: false,
};

export const AbilitySlice = createSlice({
	name: "disable",
	initialState,
	reducers: {
		setAbility: (state) => {
			state.disabled = !state.disabled;
		},
		setFalse: (state) => {
			state.disabled = false;
		},
		setTrue: (state) => {
			state.disabled = true;
		},
	},
});

export const { setAbility, setFalse, setTrue } = AbilitySlice.actions;

export default AbilitySlice.reducer;
