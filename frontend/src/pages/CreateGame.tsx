import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const CreateGame = () => {
  const [connection, setConnection] = useState<HubConnection>();

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:44328/hubs/game")
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then((result) => {
          console.log("Connected!");

          connection.on("ReceiveMessage", (message) => {
            console.log("Message: ");
            console.log(message);
          });
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, [connection]);

  const sendMessage = async () => {
    if (connection?.connectionId) {
      try {
        await connection.send("SendMessage", "Pawel");
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("No connection to server yet.");
    }
  };

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
