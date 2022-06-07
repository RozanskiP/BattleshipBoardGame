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
import ICreateSimulation from "../interfaces/ICreateSimulation";
import { RootState } from "../store/store";

const CreateGame = () => {
  // const { webSocket } = useSelector((state: RootState) => state.WebSocket);
  const { id } = useSelector((state: RootState) => state.Game);
  const navigate = useNavigate();

  const [algorithm, setAlgorithm] = useState<string>("");

  const handleChangeAlgorithm = (event: any) => {
    setAlgorithm(event.target.value as string);
  };

  const [boardSize, setBoardSize] = useState<number>(10);

  const handleChangeBoardSize = (event: any) => {
    setBoardSize(parseInt(event.target.value));
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

    axios.post("https://localhost:44328/api/Game", game).then(() => {
      console.log("Game started");
    });
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
                <MenuItem value={3}>Probability Density 'In Progres'</MenuItem>
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
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGame;
