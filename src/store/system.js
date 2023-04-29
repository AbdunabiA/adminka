import { createSlice } from "@reduxjs/toolkit";
import config from "config";

const initialState = {
	currentLangCode: config.DEFAULT_LANGUAGE,
};

export const systemSlice = createSlice({
	name: "system",
	initialState,
	reducers: {
		changeLanguage: (state, action) => {
			return {
				...state,
				currentLangCode: action.payload
			};
		},
	}
});
// Action creators are generated for each case reducer function
export const { changeLanguage, changeFilmType } = systemSlice.actions;

export default systemSlice.reducer;
