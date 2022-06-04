import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IGame from "../interfaces/IGame";
import { RootState } from "./store";

const initialState: IGame = {
  id: 0,
  player1: {
    id: 0,
    name: "Computer1",
    boardSize: 0,
    board: [],
    EnemyBoard: [],
  },
  player2: {
    id: 0,
    name: "Computer1",
    boardSize: 0,
    board: [],
    EnemyBoard: [],
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
  },
});

export const { updateRoomGame, setInitial } = GameSlice.actions;

export const selectRooms = (state: RootState) => state.Game;

export default GameSlice.reducer;
