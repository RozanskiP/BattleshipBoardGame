import { Box, Button } from "@material-ui/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Stats = () => {
  const navigate = useNavigate();

  const handleBackToMenu = () => {
    navigate("/");
  };

  const generatemockData = () => {
    const data = [];

    for (let i = 0; i < 100; i++) {
      data.push({
        name: i.toString(),
        algorithm1: i,
        algorithm2: Math.floor(Math.random() * 100),
        algorithm3: Math.floor(Math.random() * 100),
      });
    }

    return data;
  };

  return (
    <div className="App">
      <div className="App-game">
        <div className="App-header">
          <h3>REAL DATA IN THE FUTURE</h3>
          <LineChart
            width={1100}
            height={450}
            data={generatemockData()}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Legend />
            <Line type="monotone" dataKey="algorithm1" stroke="#8884d8" />
            <Line type="monotone" dataKey="algorithm2" stroke="#82ca9d" />
            <Line type="monotone" dataKey="algorithm3" stroke="#191a4d" />
          </LineChart>
          <Box m={5}>
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
  );
};

export default Stats;
