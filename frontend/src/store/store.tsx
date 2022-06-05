import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./gameSlice";
import WebSocketSlice from "./WebSocketSlice";

export const store = configureStore({
  reducer: {
    Game: gameSlice,
    WebSocket: WebSocketSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
