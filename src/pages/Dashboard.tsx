import { Box, Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="App">
        <div className="App-game">
          <div className="App-header">
            <Box m={5}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/game")}
                color="primary"
              >
                <div>Create Simulation</div>
              </Button>
            </Box>
            <Box m={5}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/stats")}
                color="primary"
              >
                <div>Show Stats</div>
              </Button>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
