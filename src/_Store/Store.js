import { configureStore, createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const url = "https://pokeapi.co/api/v2/pokemon?limit=50&offset=0";

// Create slice for 2 decks
const fullDeckSlice = createSlice({
  name: "a",
  initialState: {},
  reducers: {
    setFullDeck(state, action) {},
  },
});

export const store = configureStore({
  reducer: {
    fullDeck: fullDeckSlice.reducer,
  },
});

export const fullDeckActions = fullDeckSlice.actions;
