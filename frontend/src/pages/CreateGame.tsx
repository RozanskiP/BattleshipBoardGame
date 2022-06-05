import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";

const CreateGame = () => {
  const { webSocket } = useSelector((state: RootState) => state.WebSocket);
  const { id } = useSelector((state: RootState) => state.Game);
  const navigate = useNavigate();

  const sendMessage = async () => {
    if (webSocket?.connectionId) {
      try {
        await webSocket.send("SendMessage", "Pawel");
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("No connection to server yet.");
    }
  };

  useEffect(() => {
    if (id > 0) {
      navigate(`/game/${id}`);
    }
  }, [id, navigate]);

  const RunGame = () => {
    axios.get("https://localhost:44328/api/Game/Get").then(() => {
      console.log("Game started");
    });
  };

  return (
    <div>
      <button onClick={RunGame}>Run simulation</button>
      <button onClick={sendMessage}>sendMessage</button>
    </div>
  );
};

export default CreateGame;
