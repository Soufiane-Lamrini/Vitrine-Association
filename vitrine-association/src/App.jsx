import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Galerie from "./pages/Galerie";
import Projets from "./pages/projets";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/galerie" element={<Galerie />} />
          <Route path="/projets" element={<Projets />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;