import { configureStore, createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const playersSlice = createSlice({
  name: "playersInfo",
  initialState: { p1: "Player A", p2: "Player B" },
  reducers: {
    setPlayersNames(state, action) {
      state.p1 = action.payload[0];
      state.p2 = action.payload[1];
    },
  },
});

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
    playersInfo: playersSlice.reducer,
  },
});

export const fullDeckActions = fullDeckSlice.actions;
export const playersInfoActions = playersSlice.actions;
