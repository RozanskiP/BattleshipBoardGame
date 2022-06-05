import { useEffect } from "react";
import { useSelector } from "react-redux";
import { updateRoomGame } from "./gameSlice";
import { useAppDispatch } from "./hooks";
import { RootState } from "./store";

const WebSocketConnection = () => {
  const { webSocket } = useSelector((state: RootState) => state.WebSocket);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (webSocket) {
      webSocket
        .start()
        .then((result) => {
          console.log("Connected!");

          webSocket.on("ReceiveMessage", (message) => {
            console.log(message);
            dispatch(updateRoomGame(message));
          });
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, [webSocket]);

  return <></>;
};

export default WebSocketConnection;
