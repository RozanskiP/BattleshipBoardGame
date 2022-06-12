import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../environments";
import ICreateSimulation from "../interfaces/ICreateSimulation";
import { RootState } from "../store/store";
import { setInitial } from "../store/gameSlice";
import { useAppDispatch } from "../store/hooks";
import { toast } from "react-toastify";

const CreateGame = () => {
  const { id } = useSelector((state: RootState) => state.Game);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [algorithm, setAlgorithm] = useState<string>("");

  const handleChangeAlgorithm = (event: any) => {
    setAlgorithm(event.target.value as string);
  };

  const [boardSize, setBoardSize] = useState<number>(10);

  const handleChangeBoardSize = (event: any) => {
    setBoardSize(parseInt(event.target.value || 0));
  };

  useEffect(() => {
    if (id > 0) {
      navigate(`/game/${id}`);
    }
  }, [id, navigate]);

  const RunGame = () => {
    let game: ICreateSimulation = {
      algorithm: parseInt(algorithm),
      boardSize: boardSize,
    };

    axios
      .post(API_URL + "api/Game", game)
      .then(() => {
        toast.success("Game ended");
      })
      .catch((err: any) => {
        showError(err);
      });
  };

  const handleBackToMenu = () => {
    dispatch(setInitial());
    navigate("/");
  };

  const showError = (err: any) => {
    toast.error("You need to choose board size and algorithm type: " + err);
  };

  return (
    <div>
      <div className="App">
        <div className="App-game">
          <div className="App-header">
            <Box m={5} component="form">
              <TextField
                id="outlined-basic"
                label="Board Size"
                variant="filled"
                value={boardSize}
                onChange={handleChangeBoardSize}
              />
            </Box>
            <FormControl
              variant="filled"
              size="medium"
              style={{ minWidth: 220 }}
            >
              <InputLabel id="demo-simple-select-label">Algorithm</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={algorithm}
                label="Algorithm"
                onChange={handleChangeAlgorithm}
                defaultValue={1}
              >
                <MenuItem value={1}>Naive Implementation</MenuItem>
                <MenuItem value={2}>Random With Last Ship</MenuItem>
                <MenuItem value={3}>
                  Random With Last Ship with Better Random Choosing
                </MenuItem>
              </Select>
            </FormControl>
            <Box m={5}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={RunGame}
              >
                Run simulation
              </Button>
              <Box m={5}></Box>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                onClick={handleBackToMenu}
              >
                Back To Menu
              </Button>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGame;
