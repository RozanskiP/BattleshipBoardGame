import { HubConnectionBuilder } from "@microsoft/signalr";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { API_URL } from "../environments";
import IWebSocket from "../interfaces/IWebSocket";
import { RootState } from "./store";

const initialState: IWebSocket = {
  webSocket: new HubConnectionBuilder()
    .withUrl(API_URL + "hubs/game")
    .withAutomaticReconnect()
    .build(),
};

export const WebSocketSlice = createSlice({
  name: "WebSocket",
  initialState,
  reducers: {
    setWebSocket: (state, action: PayloadAction<IWebSocket>) => {
      return action.payload;
    },
  },
});

export const { setWebSocket } = WebSocketSlice.actions;

export const selectDefaultUser = (state: RootState) => state.WebSocket;

export default WebSocketSlice.reducer;
