import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setInitial } from "../store/gameSlice";
import { useAppDispatch } from "../store/hooks";
import { RootState } from "../store/store";
import Board from "./Board";

const GameSimulation = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id, player1, player2, round } = useSelector((state: RootState) => state.Game);

  const handleBackToMenu = () => {
    dispatch(setInitial());
    navigate("/game");
  };

  return (
    <>
      <button onClick={handleBackToMenu}>Back To Menu</button>
      <Board />
    </>
  );
};

export default GameSimulation;
