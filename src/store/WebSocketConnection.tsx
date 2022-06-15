import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
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
          toast.success("Websocket Connected!");

          webSocket.on("ReceiveMessage", (message) => {
            dispatch(updateRoomGame(message));
          });
        })
        .catch((e) => {
          toast.error("Websocket connection failed ", e);
        });
    }
  }, [webSocket]);

  return <></>;
};

export default WebSocketConnection;
