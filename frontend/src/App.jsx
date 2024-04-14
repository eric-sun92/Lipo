import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Heatmap from './Heatmap';
import Navbar from './Navbar';
import HomePage from './HomePage';
import HeatmapOG from "./HeatmapOG"
import Coronal from "./Coronal"
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Navbar/>
        {/* Define your routes */}
        <Routes>
          <Route path="/coronal" element={<Coronal />} />
          <Route path="/heatmap" element={<Heatmap />} />
          <Route path="/fullheatmap" element={<HeatmapOG />} />
          <Route path="/" element={<HomePage />} />
          {/* Example: <Route path="/about" element={<About />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;