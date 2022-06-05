import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="App">
        <div className="App-game">
          <div className="App-header">
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/game")}
              color="primary"
            >
              <div>Create Simulation</div>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
