import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IGame from "../interfaces/IGame";
import IPlayer from "../interfaces/IPlayer";
import { RootState } from "./store";

const initialState: IGame = {
  id: 0,
  boardSize: 0,
  gameEnded: false,
  player1: {
    id: 0,
    name: "Computer1",
    board: [],
    enemyBoard: [],
    win: false,
  },
  player2: {
    id: 0,
    name: "Computer1",
    board: [],
    enemyBoard: [],
    win: false,
  },
  round: 0,
};

export const GameSlice = createSlice({
  name: "Game",
  initialState,
  reducers: {
    updateRoomGame: (state, action: PayloadAction<IGame>) => {
      return action.payload;
    },
    setInitial: () => {
      return initialState;
    },
    updateFirstPlayer: (state, action: PayloadAction<IPlayer>) => {
      return {
        ...state,
        player1: action.payload,
      };
    },
    updateSecondPlayer: (state, action: PayloadAction<IPlayer>) => {
      return {
        ...state,
        player2: action.payload,
      };
    },
  },
});

export const {
  updateRoomGame,
  setInitial,
  updateFirstPlayer,
  updateSecondPlayer,
} = GameSlice.actions;

export const selectRooms = (state: RootState) => state.Game;

export default GameSlice.reducer;
