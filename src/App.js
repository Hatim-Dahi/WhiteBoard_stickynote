import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import DrawingArea from "./components/Draw/DrawingArea";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="drawing" element={<DrawingArea />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
