import { configureStore, createSlice } from "@reduxjs/toolkit";

const gameLogicSlice = createSlice({
  name: "gameLogic",
  initialState: {
    isStart: false,
    isAttack: true,
    numAttackDice: 0, // max 3
    numDeffenceDice: 0, // max 2
    numCardsDeck1: 5,
    numCardsDeck2: 5,
    isBigCardLeft: false,
    isBigCardRight: false,
    isDiceReactivated: false,
    attackResults: [],
    deffenceResults: [],
  },
  reducers: {
    setIsStart(state) {
      state.isStart = !state.isStart;
    },
    setIsAttack(state) {
      state.isAttack = !state.isAttack;
    },
    setAttackDice(state) {
      state.numAttackDice = state.numAttackDice + 1; // max 3
    },
    setDeffenceDice(state) {
      state.numDeffenceDice = state.numDeffenceDice + 1; // max 2
    },
    resetAttackDice(state) {
      state.numAttackDice = 0;
    },
    resetDeffenceDice(state) {
      state.numDeffenceDice = 0;
    },
    setNumCardsDeck1(state) {
      state.numCardsDeck1 = state.numCardsDeck1 + 1;
    },
    setNumCardsDeck2(state) {
      state.numCardsDeck2 = state.numCardsDeck2 + 1;
    },
    setIsBigCardLeft(state) {
      state.isBigCardLeft = !state.isBigCardLeft;
    },
    setIsBigCardRight(state) {
      state.isBigCardRight = !state.isBigCardRight;
    },
    reactivateDice(state) {
      state.isDiceReactivated = !state.isDiceReactivated;
    },
    updaterAttackRoll(state, action) {
      state.attackResults = [...state.attackResults, action.payload];
    },
    updateDeffenceRoll(state, action) {
      state.deffenceResults = [...state.deffenceResults, action.payload];
    },
    resetAttackRoll(state) {
      state.attackResults = [];
    },
    resetDeffenceRoll(state) {
      state.deffenceResults = [];
    },
  },
});

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
  initialState: { deck1: [], deck2: [], bigCard1: {}, bigCard2: {} },
  reducers: {
    setDecks(state, action) {
      state.deck1 = action.payload[0];
      state.deck2 = action.payload[1];
    },
    setBigCard1(state, action) {
      state.bigCard1 = action.payload;
    },
    setBigCard2(state, action) {
      state.bigCard2 = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: {
    playersDecks: decksSlice.reducer,
    playersInfo: playersSlice.reducer,
    gameLogic: gameLogicSlice.reducer,
  },
});

export const decksActions = decksSlice.actions;
export const playersInfoActions = playersSlice.actions;
export const gameLogicActions = gameLogicSlice.actions;
