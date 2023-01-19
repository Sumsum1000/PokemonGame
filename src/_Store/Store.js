import { configureStore, createSlice } from "@reduxjs/toolkit";

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
const decksSlice = createSlice({
  name: "playersDecks",
  initialState: { deck1: [], deck2: [] },
  reducers: {
    setDecks(state, action) {
      state.deck1 = action.payload[0];
      state.deck2 = action.payload[1];
    },
  },
});

export const store = configureStore({
  reducer: {
    playersDecks: decksSlice.reducer,
    playersInfo: playersSlice.reducer,
  },
});

export const decksActions = decksSlice.actions;
export const playersInfoActions = playersSlice.actions;
