import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setInitial } from "../store/gameSlice";
import { useAppDispatch } from "../store/hooks";
import { RootState } from "../store/store";
import Board from "./Board";

const GameSimulation = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { gameEnded } = useSelector((state: RootState) => state.Game);

  const { webSocket } = useSelector((state: RootState) => state.WebSocket);

  const handleBackToMenu = () => {
    if (gameEnded || webSocket.connectionId === null) {
      dispatch(setInitial());
      navigate("/game");
    } else {
      toast.error("You can't change view before game ended");
    }
  };

  return (
    <div style={{ backgroundColor: "#f6f6cc" }}>
      <Button
        variant="contained"
        size="large"
        color="secondary"
        onClick={handleBackToMenu}
      >
        Back To Menu
      </Button>
      <Board />
    </div>
  );
};

export default GameSimulation;
