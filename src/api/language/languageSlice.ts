import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import enStrings from "./strings.en";
import arStrings from "./strings.ar";

type Language = "en" | "ar";

interface LanguageState {
  currentLanguage: Language;
  resources: Record<Language, Record<string, string>>;
}

const initialState: LanguageState = {
  currentLanguage: "en",
  resources: {
    en: enStrings,
    ar: arStrings,
  },
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<Language>) {
      state.currentLanguage = action.payload;
      
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
