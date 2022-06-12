import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreateGame from "./pages/CreateGame";
import Dashboard from "./pages/Dashboard";
import GameSimulation from "./pages/GameSimulation";
import WebSocketConnection from "./store/WebSocketConnection";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Stats from "./pages/Stats";

const App = () => {
  return (
    <>
      <div>
        <div className="main-content">
          <WebSocketConnection />
          <Suspense fallback={<div>Loading...</div>}></Suspense>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/game" element={<CreateGame />} />
            <Route path="/game/:gameId" element={<GameSimulation />} />
            <Route path="/stats" element={<Stats />} />
          </Routes>
          <ToastContainer closeButton={false} position="top-right" />
        </div>
      </div>
    </>
  );
};

export default App;
