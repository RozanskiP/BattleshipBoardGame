import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HeaderBar from "./components/HeaderBar";
import CreateGame from "./pages/CreateGame";
import Dashboard from "./pages/Dashboard";
import GameSimulation from "./pages/GameSimulation";

const App = () => {
  return (
    <>
      <div>
        <HeaderBar />
        <div className="main-content">
          <Suspense fallback={<div>Loading...</div>}></Suspense>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/game" element={<CreateGame />} />
            <Route path="/game/:gameId" element={<GameSimulation />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
