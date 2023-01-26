import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
// import counterReducer from '../features/counter/counterSlice';
import GameSlicer from "../features/game/GameSlice";
import ResultSlicer from "../features/game/ResultSlice";
import BoardSlicer from "../features/game/BoardSlice";
import AbilitySlicer from "../features/game/DisableBoardSlice";
import VolumeSlicer from "../features/game/VolumeSlice";
export const store = configureStore({
	reducer: {
		// counter: counterReducer,
		boardelements: GameSlicer,
		opponent: ResultSlicer,
		change: BoardSlicer,
		ability: AbilitySlicer,
		volume: VolumeSlicer,
	},
});
