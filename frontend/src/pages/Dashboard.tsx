import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button onClick={() => navigate("/game")} color="primary">CreateGame</Button>
    </>
  );
};

export default Dashboard;
