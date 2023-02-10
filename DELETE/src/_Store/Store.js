import {
  configureStore,
  createSlice,
  isAsyncThunkAction,
} from "@reduxjs/toolkit";

const gameLogicSlice = createSlice({
  name: "gameLogic",
  initialState: {
    isGameRunning: true,
    isPlayerTurn: false,
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
    isModal: false,
    terminatedL: "",
    terminatedR: "",
  },
  reducers: {
    setIsGameRunning(state, action) {
      state.isGameRunning = action.payload;
    },
    setIsModal(state, action) {
      state.isModal = action.payload;
    },
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
    updaterAttackResult(state, action) {
      state.attackResults = [...state.attackResults, action.payload];
    },
    updateDeffenceResult(state, action) {
      state.deffenceResults = [...state.deffenceResults, action.payload];
    },
    resetAttackResult(state) {
      state.attackResults = [];
    },
    resetDeffenceResult(state) {
      state.deffenceResults = [];
    },
    setPlayerTurn(state) {
      state.isPlayerTurn = !state.isPlayerTurn;
    },
    setTerminatedL(state, action) {
      console.log("TERMINATED L");
      state.terminatedL = action.payload;
    },
    setTerminatedR(state, action) {
      state.terminatedR = action.payload;
    },
  },
});

const player1Slice = createSlice({
  name: "player1",
  initialState: {
    isPlaying: true,
    deckCounter: 5,
    mode: "attack",
    bigCardHp: "-",
    isBigCard: false,
    isLost: null,
    name: "Player 1",
    isAttack: true,
    isDefence: false,
  },
  reducers: {
    setIsPlaying(state, action) {
      state.isPlaying = action.payload;
    },
    substructDeckCounter(state) {
      state.deckCounter = state.deckCounter - 1;
    },
    resetDeckCounter(state) {
      state.deckCounter = 5;
    },
    setAttackMode(state) {
      state.mode = "attack";
    },
    setDeffenceMode(state) {
      state.mode = "deffence";
    },
    setBigCardHp(state, action) {
      state.bigCardHp = action.payload;
    },
    setIsBIgCard(state, action) {
      state.isBigCard = action.payload;
    },
    setIsLost(state) {
      state.isLost = true;
    },
    setName(state, action) {
      state.name = action.payload;
    },
    setIsAttack(state, action) {
      state.isAttack = action.payload;
    },
    setIsDefence(state, action) {
      state.isDefence = action.payload;
    },
  },
});

const player2Slice = createSlice({
  name: "player2",
  initialState: {
    isPlaying: false,
    deckCounter: 5,
    mode: "deffence",
    bigCardHp: "-",
    isBigCard: false,
    isLost: null,
    name: "Player 2",
    isAttack: true,
    isDefence: false,
  },
  reducers: {
    setIsPlaying(state, action) {
      state.isPlaying = action.payload;
    },
    substructDeckCounter(state) {
      state.deckCounter = state.deckCounter - 1;
    },
    resetDeckCounter(state) {
      state.deckCounter = 5;
    },
    setAttackMode(state) {
      state.mode = "attack";
    },
    setDeffenceMode(state) {
      state.mode = "deffence";
    },
    setBigCardHp(state, action) {
      state.bigCardHp = action.payload;
    },
    setIsBIgCard(state, action) {
      state.isBigCard = action.payload;
    },
    setIsLost(state) {
      state.isLost = true;
    },
    setName(state, action) {
      state.name = action.payload;
    },
    setIsAttack(state, action) {
      state.isAttack = action.payload;
    },
    setIsDefence(state, action) {
      state.isDefence = action.payload;
    },
  },
});

const url = "https://pokeapi.co/api/v2/pokemon?limit=50&offset=0";

// move this slice to player 1 and player 2
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
    //playersInfo: playersSlice.reducer,
    gameLogic: gameLogicSlice.reducer,
    player1: player1Slice.reducer,
    player2: player2Slice.reducer,
  },
});

export const decksActions = decksSlice.actions;
//export const playersInfoActions = playersSlice.actions;
export const gameLogicActions = gameLogicSlice.actions;
export const player1Actions = player1Slice.actions;
export const player2Actions = player2Slice.actions;
